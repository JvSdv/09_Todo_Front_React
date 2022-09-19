import React, { useEffect, useRef, useState } from 'react';
//prettier-ignore
import { Container, Row, Col, Form, Button, Table, Card, CardGroup, Modal, ModalBody, Pagination } from 'react-bootstrap';
import { Item } from './types/item';
import { filterListByMonth, getCurrentYearMonthDay } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InforArea';
import { MainForm } from './components/MainForm';
import Api from './api/api';
import { meta, Task } from './types/tasks';
import { TypeSignUp } from './types/formLogin';
//importar uuid
//import uuid from 'uuid';

function App() {
   const api = new Api();
   //App de Finanças pessoais, que permite um gereciamento mensal de despesas e receitas

   const [list, setList] = useState<Item[]>([]);
   const [filteredList, setFilteredList] = useState<Item[]>([]);

   const [date, setdate] = useState<string>(getCurrentYearMonthDay());
   const [page, setPage] = useState<number>(1);
   const [token, setToken] = useState<string>('');
   const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
   const [showModalSignup, setShowModalSignup] = useState<boolean>(false);
   const [tasks, setTasks] = useState<Task[]>([]);

   const [meta, setMeta] = useState<meta>();
   const [email, setEmail] = useState<string>('admin@gmail.com');
   const [password, setPassword] = useState<string>('admin');

   const [signupForm, setSignupForm] = useState<TypeSignUp>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const [adicionar, setAdicionar] = useState<boolean>(false);

   //FUNÇÃO DE CONTROLE
   useEffect(() => {
      console.log(tasks);
      /* setFilteredList(tasks) */ //AMANHA
   }, [tasks]);

   function verifyToken() {
      if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
         return true;
      } else {
         return false;
      }
   }

   function reenderizar() {
      api.getAllUserTasks(page, date)
         .then((response) => {
            setTasks(response.data.tasks.data);
            setMeta(response.data.tasks.meta);
         })
         .catch((error) => {
            console.log(error);
         });
   }

   useEffect(() => {
      //pegar todas as tarefas do usuário
      if (!verifyToken()) {
         reenderizar();
      }
   }, [page, date, adicionar]);

   //useEffects para ver se o usuário está logado
   useEffect(() => {
      verifyToken() ? setShowModalLogin(true) : setShowModalLogin(false);
   }, []);
   useEffect(() => {
      if (verifyToken()) {
         localStorage.setItem('token', token); //setar o token do localStorage com o token do usuário
      }
   }, [token]);
   //comando para deletar tokem do localStorage: localStorage.removeItem('token');

   //FUNCTIONS
   //handleLogin
   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = (e.target as any).elements[0].value;
      const password = (e.target as any).elements[1].value;
      api.login(email, password)
         .then((res) => {
            setToken(res.data.token);
            setShowModalLogin(false);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   //handleSignup
   function handleSignup() {
      //validar as senhas //**
      if (signupForm.password === signupForm.confirmPassword) {
         console.log('senhas iguais');
         api.signUp(signupForm.name, signupForm.email, signupForm.password)
            .then((res) => {
               console.log(res.data.response);
               setToken(res.data.token);
               setShowModalSignup(false);
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         alert('As senhas não conferem');
      }
   }
   return (
      <>
         <style>{`
            .bg-fluid {
               background-color: #00008b;
               height: 150px;
            }
            .mt-negative-4 {
               margin-top: -4rem;
            }
            
         `}</style>
         {/* header */}
         <Container fluid className='bg-fluid'>
            <Row className='text-center '>
               <Col>
                  <h1 className='text-white mt-3'>ToDo list / React / AdonisJs</h1>
               </Col>
            </Row>
         </Container>
         {/* body */}
         <Container>
            {/* Informações */}
            <Row className='shadow-lg bg-light mt-negative-4 rounded mb-3 p-3'>
               <InfoArea filteredList={filteredList} date={date} setDate={setdate} />
            </Row>

            {/* Formulario */}
            <Row className='shadow-lg bg-light rounded mb-3 p-3'>
               <MainForm adicionou={adicionar} setAdicionou={setAdicionar} />
            </Row>
            {/* Tabela*/}
            <Row className='shadow-lg bg-light rounded mt-3 mb-3'>
               <TableArea tasks={tasks} adicionou={adicionar} setAdicionou={setAdicionar} />
            </Row>

            {/* Paginação */}
            <div className='d-flex align-content-center justify-content-between'>
               <Pagination>
                  <Pagination.First onClick={() => setPage(meta!.first_page)} />
                  <Pagination.Prev onClick={() => setPage(page - 1)} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={() => setPage(page + 1)} />
                  <Pagination.Last onClick={() => setPage(meta!.last_page)} />
               </Pagination>
               {/* fazer um botao para sair */}
               <Button
                  variant='primary'
                  className='mb-3'
                  onClick={() => {
                     localStorage.removeItem('token');
                     setShowModalLogin(true);
                  }}
               >
                  Sair
               </Button>
            </div>
         </Container>

         {/* Modal de login */}
         <Modal show={showModalLogin}>
            <Modal.Header>
               <Modal.Title>Login</Modal.Title>
               <h6 className='ms-2'>
                  Utilize o email: admin@gmail.com e a senha: admin <br></br> Para testar o sistema
               </h6>
            </Modal.Header>
            <Modal.Body>
               <Form
                  onSubmit={(e) => {
                     handleLogin(e);
                  }}
               >
                  <Form.Group controlId='formBasicEmail'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                     <Form.Label>Senha</Form.Label>
                     <Form.Control
                        type='password'
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='mt-3'>
                     Entrar
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={() => {
                     setShowModalSignup(true);
                     setShowModalLogin(false);
                  }}
               >
                  Criar conta
               </Button>
            </Modal.Footer>
         </Modal>

         {/* Modal de criação de conta */}
         {/* vai ter nome, email, senha e confirmar senha */}
         {/* quando alterarmos vamos alterar no objeto signupForm */}
         <Modal show={showModalSignup}>
            <Modal.Header>
               <Modal.Title>Criar conta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group controlId='formBasicName'>
                     <Form.Label>Nome</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Digite seu nome'
                        onChange={(e) => {
                           setSignupForm({ ...signupForm, name: e.target.value });
                        }}
                     />
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type='email'
                        placeholder='Digite seu email'
                        onChange={(e) => {
                           setSignupForm({ ...signupForm, email: e.target.value });
                        }}
                     />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                     <Form.Label>Senha</Form.Label>
                     <Form.Control
                        type='password'
                        placeholder='Digite sua senha'
                        onChange={(e) => {
                           setSignupForm({ ...signupForm, password: e.target.value });
                        }}
                     />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword2'>
                     <Form.Label>Confirmar senha</Form.Label>
                     <Form.Control
                        type='password'
                        placeholder='Confirme sua senha'
                        onChange={(e) => {
                           setSignupForm({ ...signupForm, confirmPassword: e.target.value });
                        }}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant='primary'
                  type='submit'
                  onClick={() => {
                     handleSignup();
                  }}
               >
                  Criar conta
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default App;
