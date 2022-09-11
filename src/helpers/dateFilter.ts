//Date Filter Helper

import { networkInterfaces } from 'os';
import { Item } from '../types/item';

/* export function getCurrentMonthAndYear(): string {
   const date = new Date();
   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
} */

export function getCurrentYearMonthDay(): string {
   //pegar o dia atual
   //o .day retorna o dia da semana, sendo 0 para domingo e 6 para sábado, usa o .getDate
   const date = new Date();
   return `${date.getFullYear()}-${(date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1)}-${
      (date.getDate() < 10 ? '0' : '') + date.getDate()
   }`;
}

//lista dos meses e seus dias
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//AAAA-MM-DD
export function getPreviousDay(date: string): string {
   const [year, month, day] = date.split('-');
   const newDay = Number(day) - 1;
   //se o dia for menor que 1, então é o último dia do mês anterior

   //se o ano for bissexto, fevereiro tem 29 dias
   if (Number(year) % 4 === 0) {
      months[1] = 29;
   }
   //se o dia for menor que 1, então é o último dia do mês anterior
   if (newDay < 1) {
      const newMonth = Number(month) - 1;
      //se o mês for menor que 1, então é o último mês do ano anterior
      if (newMonth < 1) {
         const newYear = Number(year) - 1;
         return `${newYear}-${12}-${months[11]}`;
      }
      return `${year}-${newMonth}-${months[newMonth - 1]}`;
   }
   return `${year}-${month}-${newDay}`;
}

export function getNextDay(date: string): string {
   const [year, month, day] = date.split('-');
   const newDay = Number(day) + 1;
   //se ano for bissexto, fevereiro tem 29 dias
   if (Number(year) % 4 === 0) {
      months[1] = 29;
   }
   //se o dia for maior que o último dia do mês, então é o primeiro dia do mês seguinte
   if (newDay > months[Number(month) - 1]) {
      const newMonth = Number(month) + 1;
      //se o mês for maior que 12, então é o primeiro mês do ano seguinte
      if (newMonth > 12) {
         const newYear = Number(year) + 1;
         return `${newYear}-${1}-${1}`;
      }
      return `${year}-${newMonth}-${1}`;
   }
   return `${year}-${month}-${newDay}`;
}

/* //getPreviousMonth(currentMonth)
export function getPreviousMonth(date: string): string {
   const [year, month] = date.split('-');
   const monthNumber = parseInt(month, 10);
   const previousMonth = monthNumber - 1;
   const yearNumber = parseInt(year, 10);
   if (previousMonth === 0) {
      return `${yearNumber - 1}-12`;
   }
   return `${yearNumber}-${previousMonth}`;
}
//getNextMonth(date)
export function getNextMonth(date: string): string {
   const [year, month] = date.split('-');
   const monthNumber = parseInt(month, 10);
   const nextMonth = monthNumber + 1;
   const yearNumber = parseInt(year, 10);
   if (nextMonth === 13) {
      return `${yearNumber + 1}-01`;
   }
   return `${yearNumber}-${nextMonth}`;
}
 */

export function formatCurrentMonth(date: string): string {
   //AAAA-MM-DD
   const [year, month, day] = date.split('-');
   //prettier-ignore
   const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
   //retornar o dia / mês / ano
   //se o dia for menor de 10, então adicionar um 0 antes do dia
   if (day.length < 2) {
      return `0${day}/${meses[parseInt(month) - 1]}/${year}`;
   }
   return `${day}/${meses[parseInt(month) - 1]}/${year}`;
}

export function filterListByMonth(list: Item[], date: string): Item[] {
   let newList: Item[] = [];
   let [year, month] = date.split('-'); //aqui já está separado o ano e o mês
   list.forEach((item) => {
      /* const [itemYear, itemMonth] = item.date.toLocaleDateString('pt-BR').split('/');
        if (itemYear === year && itemMonth === month) {
            newList.push(item);
        } */
      if (
         item.date.getFullYear() === parseInt(year) &&
         item.date.getMonth() + 1 === parseInt(month)
      )
         newList.push(item);
   });
   return newList;
}

export function formatDate(date: Date) {
   //vamos separar a data em dia, mês e ano e hora e minuto e formata-los para o formato dd/mm/aaaa hh:mm
   /* 2022-08-12T15:13:37.000Z */
   //transformar a data em string
   const dateString = `${date}`;
   //separar a data em dia, mês e ano
   const [year, month, day] = dateString.split('T')[0].split('-');
   //separar a hora e minuto
   const [hour, minute] = dateString.split('T')[1].split(':');
   //formatar a data
   //pegar todos os dados e retornar em date format para tolocaledatestring
   //gambiarra tinha que usar uma biblioteca de datas tipo moment.js
   let dateFormatted = new Date(`${year}-${month}-${day}T${parseInt(hour) - 3}:${minute}`);
   return dateFormatted.toLocaleString('pt-BR');

   //return `${day}/${month}/${year} ${hour}:${minute}`;
}
