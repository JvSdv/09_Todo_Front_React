import { useEffect, useState } from 'react';
import MyCalendar from '../myCalendar';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { Category, CreateTask } from '../../types/tasks';
import Api from '../../api/api';

type Props = {
   adicionou: boolean;
   setAdicionou: (adicionou: boolean) => void;
};

export function MainForm({ adicionou, setAdicionou }: Props) {
   const api = new Api();
   //essa deve ser o objeto que vai adicionar uma nova tarefa ao bancode dados
   /* {
      "title": "tarefa 1",
      "datetime":"2022-08-20T17:07:45-03:00",
      "description": "res",
      "category_id": 1
   } */

   const [error, setError] = useState('');
   const [form, setForm] = useState<CreateTask>({
      title: '',
      description: '',
      datetime: new Date(),
      category_id: 1,
   });
   const [categories, setCategories] = useState<Category[]>([]);

   /* Category = {
    id: number;
    title: string;
    color: string;
} */

   /* useEffect(() => {
      console.log(form);
   }, [form]); */

   function getAllCategories() {
      api.getAllUserCategories()
         .then((res) => {
            setCategories(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   useEffect(() => {
      getAllCategories();
   }, []);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //pegar a data do formulario que vai vir assim: datetime: Sat Aug 20 2022 00:00:00 GMT-0300 (GMT-03:00)
      //e transformar em string para mandar para o backend, assim: "2022-08-20T17:07:45-03:00"
      //verificar se o formulario está preenchido
      if (form.title === '' || form.datetime === '') {
         setError('Preencha todos os campos');
         return;
      }
      //se a descrição estiver vazia coloque a string vazia
      if (form.description === '') {
         form.description = '----';
      }

      const datetime = (form.datetime as Date).toISOString();
      const date = datetime.split('T')[0];
      const time = new Date().toLocaleTimeString();
      const datetimeFinal = `${date}T${time}`;
      console.log(datetimeFinal);

      const newTask: CreateTask = {
         title: form.title,
         description: form.description,
         datetime: datetimeFinal,
         category_id: form.category_id,
      };
      api.createTask(newTask)
         .then((res) => {
            //se tiver sucesso mudar o estado para true se tiver falso e para false se estiver true
            setAdicionou(!adicionou);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <Col md={12}>
         {error !== '' && <Alert variant='danger'>{error}</Alert>}

         <Form onSubmit={handleSubmit}>
            <Row>
               <Col md='3'>
                  <Form.Group controlId='formBasicTitle'>
                     <Form.Label>Título</Form.Label>
                     <Form.Control
                        type='text'
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder='Título'
                     />
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group controlId='formBasicValue'>
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control
                        type='text'
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder='Descrição'
                     />
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group controlId='formBasicCategory'>
                     <Form.Label>Categorias</Form.Label>
                     <Form.Control
                        as='select'
                        value={form.category_id}
                        onChange={(e) =>
                           setForm({ ...form, category_id: parseInt(e.target.value) })
                        }
                     >
                        {categories.map((category) => (
                           <option key={category.id} value={category.id}>
                              {category.title}
                           </option>
                        ))}
                     </Form.Control>
                  </Form.Group>
               </Col>

               <Col md='3'>
                  <Form.Group as={Row} controlId='formBasicDate'>
                     <Col sm='12'>
                        <Form.Label>Data</Form.Label>
                     </Col>
                     <Col sm='12'>
                        <MyCalendar
                           date={form.datetime as Date}
                           setDate={(date) => setForm({ ...form, datetime: date })}
                        />
                     </Col>
                  </Form.Group>
               </Col>
            </Row>
            <Button className='mt-2' variant='primary' type='submit'>
               Adicionar
            </Button>
         </Form>
      </Col>
   );
}
