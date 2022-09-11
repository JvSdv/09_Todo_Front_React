import { Category } from '../types/category';

export const categories: Category = {
   food: { title: 'Alimentação', color: '#FFA500', expense: true },
   rent: { title: 'Aluguel', color: '#00BFFF', expense: true },
   salary: { title: 'Salário', color: '#008000', expense: false },
   expensive: { title: 'Gastos', color: '#FF0000', expense: true },
   cheap: { title: 'Lucros', color: '#0000FF', expense: false },
};
