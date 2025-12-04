import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
    });
  }

  addTodo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const newTodo: Omit<Todo, 'id'> = {
      title: value.title ?? '',
      description: value.description ?? '',
      status: (value.status as any) ?? 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todoService.addTodo(newTodo).then(() => {
      this.router.navigate(['/']);
    });
  }
}
