import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService, Todo } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {

  todos$!: Observable<Todo[]>;

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {
    // ✅ Correct: use Firestore observable
    this.todos$ = this.todoService.getTodos();
  }

  edit(id: string) {
    this.router.navigate(['/edit', id]);
  }

  delete(id: string) {
    this.todoService.deleteTodo(id);
  }
}
