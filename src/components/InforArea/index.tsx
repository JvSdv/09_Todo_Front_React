import { categories } from '../../data/categories';
import { Item } from '../../types/item';
import { Category } from '../../types/category';
import { Col, Card, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { formatCurrentMonth, getNextDay, getPreviousDay } from '../../helpers/dateFilter';
import leftArrow from '../../../src/assets/leftarrow.png';
import rightArrow from '../../../src/assets/leftarrow.png';

/* export const categories: Category = {
   food: { title: 'Alimentação', color: '#FFA500', expense: true },
   rent: { title: 'Aluguel', color: '#00BFFF', expense: true },
   salary: { title: 'Salário', color: '#008000', expense: false },

   export function getCurrentMonthAndYear(): string {
   const date = new Date();
   return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
}; */

type Props = {
   filteredList: Item[];
   date: string;
   setDate: (date: string) => void;
};

export function InfoArea({ filteredList, date, setDate }: Props) {
   const [receita, setReceita] = useState<number>(0);
   const [despesa, setDespesa] = useState<number>(0);
   const [total, setTotal] = useState<number>(0);

   useEffect(() => {
      let receita = 0;
      let despesa = 0;
      filteredList.forEach((item) => {
         if (categories[item.category].expense) {
            despesa += item.value;
         } else {
            receita += item.value;
         }
      });
      setReceita(receita);
      setDespesa(despesa);
      setTotal(receita - despesa);
   }, [filteredList]);

   return (
      <>
         <Col sm='12' md='4' className='text-center mb-2 align-self-center'>
            <Row>
               <Col>
                  <Button onClick={() => setDate(getPreviousDay(date))}>
                     <img src={leftArrow} alt='left arrow' width={25} />
                  </Button>
               </Col>
               <Col>
                  <h4>{formatCurrentMonth(date)}</h4>
               </Col>
               <Col>
                  <Button onClick={() => setDate(getNextDay(date))}>
                     <img
                        src={rightArrow}
                        alt='right arrow'
                        width={25}
                        style={{ transform: 'rotate(180deg)' }}
                     />
                  </Button>
               </Col>
            </Row>
         </Col>

         {receita > 0 && (
            <Col>
               <Card bg='success' text='white' className='text-center'>
                  <Card.Body>
                     <Card.Title>Receita</Card.Title>
                     <Card.Text>
                        {receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         )}
         {despesa > 0 && (
            <Col>
               <Card bg='danger' text='white' className='text-center'>
                  <Card.Body>
                     <Card.Title>Despesa</Card.Title>
                     <Card.Text>
                        {despesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         )}
         {total > 0 && (
            <Col>
               <Card bg='primary' text='white' className='text-center'>
                  <Card.Body>
                     <Card.Title>Balanço</Card.Title>
                     <Card.Text>
                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </Card.Text>
                  </Card.Body>
               </Card>
            </Col>
         )}
      </>
   );
}
