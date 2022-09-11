import { Table, Button, Card, FormCheck } from 'react-bootstrap';
import { formatDate } from '../../helpers/dateFilter';
import { Task } from '../../types/tasks';
import Api from '../../api/api';

type Props = {
   tasks: Task[];
   adicionou: boolean;
   setAdicionou: (adicionou: boolean) => void;
};

export function TableArea({ tasks, adicionou, setAdicionou }: Props) {
   const api = new Api();
   //criar uma tabela mostrando os itens, primeiro a data, depois a categoria, depois o titulo, depois o valor e depois um botão para remover o item da lista de itens (remover o item da lista de itens)
   /* const handleRemoveItem = (item: Item) => {
      const newList = list.filter((itemList) => itemList.id !== item.id);
      setList(newList);
   }; */

   const handleRemoveTask = (task_id: number) => {
      api.deleteTask(task_id)
         .then(() => {
            setAdicionou(!adicionou);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleCheck = (task_id: number) => {
      api.checkTask(task_id)
         .then(() => {
            setAdicionou(!adicionou);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   function oppositeColors(color: string) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? 'black' : 'white';
   }

   return (
      <Table responsive hover className='table-light'>
         <thead>
            {/* id: number;
               title: string;
               datetime: Date;
               description: string;
               is_done: number;
               created_at: Date;
               updated_at: Date;
               category: {
                  id: number;
                  title: string;
                  color: string;
               }
            */}
            <tr>
               <th>Is_Done</th>
               <th>Title </th>
               <th>Description</th>
               <th>Category</th>
               <th>Datetime</th>
               <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {tasks.map((item: Task) => (
               <tr key={item.id}>
                  <td>
                     <FormCheck
                        className='fs-3'
                        isInvalid={item.is_done === 0}
                        isValid={item.is_done === 1}
                        type='checkbox'
                        checked={item.is_done === 1 ? true : false}
                        onChange={() => {
                           handleCheck(item.id);
                        }}
                     />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description ? item.description : '-'}</td>
                  <td>
                     <Card
                        style={{
                           backgroundColor: item.category.color,
                           color: oppositeColors(item.category.color),
                        }}
                        className='text-center p-1 d-inline-block'
                     >
                        {item.category.title}
                     </Card>
                  </td>
                  <td>{formatDate(item.datetime)}</td>
                  {/* formatDate */}
                  <td>
                     <Button
                        variant='danger'
                        onClick={() => {
                           handleRemoveTask(item.id);
                        }}
                     >
                        Remover
                     </Button>
                  </td>
               </tr>
            ))}
         </tbody>
      </Table>
   );
}
