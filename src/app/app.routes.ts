import { Routes } from '@angular/router';
import { TodoListComponent } from './pages/add-todo/todo-list/todo-list.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { EditTodoComponent } from './pages/add-todo/edit-todo/edit-todo.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: AddTodoComponent },
  { path: 'edit/:id', component: EditTodoComponent },
];
