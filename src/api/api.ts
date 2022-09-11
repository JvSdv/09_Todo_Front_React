//url "url": "http://127.0.0.1:3333",
/* rotas:
Route.post("/login", "UsersController.login");
Route.post("/logout", "UsersController.logout");
//mostrar os dados do usuário
Route.get("/me", "UsersController.me").middleware("auth");
Route.post("/singup", "UsersController.store");

//ToDo list com login, tendo usuaário, categorias e tarefas
//vamos precisar mostrar as tarefas de cada usuário, e cada tarefa tem uma categoria, e cada categoria tem um usuário, e cada usuário tem uma lista de tarefas e categorias

//criar uma rota para criar uma tarefa, com autenticação
Route.post("/tasks", "TasksController.create").middleware("auth");
//criar uma rota para listar todas as tarefas
Route.get("/tasks", "TasksController.index").middleware("auth");
//criar uma rota para editar uma tarefa
Route.put("/tasks/:id", "TasksController.update").middleware("auth");
//criar um rota para definir uma tarefa como concluída
Route.put("/tasks/:id/done", "TasksController.done").middleware("auth");
//criar uma rota para deletar uma tarefa
Route.delete("/tasks/:id", "TasksController.delete").middleware("auth");

//criar uma rota para criar uma categoria, com autenticação
Route.post("/categories", "CategoriesController.create").middleware("auth");
//criar uma rota para listar todas as categorias
Route.get("/categories", "CategoriesController.index").middleware("auth");
//criar uma rota para editar uma categoria
Route.put("/categories/:id", "CategoriesController.update").middleware("auth");
//criar uma rota para deletar uma categoria
Route.delete("/categories/:id", "CategoriesController.delete").middleware(
  "auth"
);
*/
import axios from 'axios';
import { Tasks, Category, CreateTask } from '../types/tasks';
const BaseUrl = 'http://127.0.0.1:3333';

//pegar o token do localStorage e validar se o token é válido
export function getToken(): string {
   return localStorage.getItem('token') || '';
}

export default class Api {
   async login(email: string, password: string) {
      return await axios.post(`${BaseUrl}/login`, {
         email,
         password,
      });
   }
   async getAllUserTasks(page: number, date: string) {
      //const { page, date } = request.qs();
      return await axios.get<Tasks>(`${BaseUrl}/tasks?page=${page}&date=${date}`, {
         headers: {
            Authorization: `Bearer ${getToken()}`,
         },
      });
   }
   async getAllUserCategories() {
      return await axios.get<Category[]>(`${BaseUrl}/categories`, {
         headers: {
            Authorization: `Bearer ${getToken()}`,
         },
      });
   }
   async createTask(CreateTask: CreateTask) {
      return await axios.post(`${BaseUrl}/tasks`, CreateTask, {
         headers: {
            Authorization: `Bearer ${getToken()}`,
         },
      });
   }
   async deleteTask(id: number) {
      return await axios.delete(`${BaseUrl}/tasks/${id}`, {
         headers: {
            Authorization: `Bearer ${getToken()}`,
         },
      });
   }
   async checkTask(id: number) {
      return await axios.put(
         `${BaseUrl}/tasks/${id}/done`,
         {},
         {
            headers: {
               Authorization: `Bearer ${getToken()}`,
            },
         },
      );
   }
}
