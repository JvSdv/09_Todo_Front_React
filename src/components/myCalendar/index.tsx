/*Usar react e react-bootstrap para criar. Crie uma variaveis no react que vai armazenar a data, crie um botão que quando clicado vai abrir um modal e dentro desse modal vai ter um calendario para selecionar qualquer dia, coloque o mes atual apareçendo primeiro e a data atual com o fundo azul, utilize setas para mudar de mês e crie um seletor de ano também, quando selecionar algum ano o mês começa em janeiro. Após a pessoa selecionar algum dia retornar esse Date e armazenar na variavel inicial.*/

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'react-bootstrap';

type Props = {
   date: Date;
   setDate: (date: Date) => void;
};

function DatePicker({ date, setDate }: Props) {
   const [show, setShow] = useState(false);
   //const [date, setDate] = useState(new Date());

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Button variant='primary' onClick={handleShow}>
            Selecionar {date.toLocaleDateString()}
         </Button>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Selecione uma data</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
               <Calendar
                  onChange={(date: Date) => setDate(date)}
                  value={date}
                  className='m-auto w-100 border-0'
               />
            </Modal.Body>
            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>
                  Fechar
               </Button>
               <Button variant='primary' onClick={handleClose}>
                  Salvar
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default DatePicker;
