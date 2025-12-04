import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService, Todo } from '../../../services/todo.service';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  id!: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get ID from route
    this.id = this.route.snapshot.paramMap.get('id')!;

    // Initialize the form
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required]
    });

    // Load the todo item from the service
    this.todoService.getTodos().subscribe((list: Todo[]) => {
      const todo = list.find(t => t.id === this.id);
      if (todo) {
        this.form.patchValue({
          title: todo.title,
          description: todo.description,
          status: todo.status
        });
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.todoService.updateTodo(this.id, {
      ...this.form.value,
      updatedAt: new Date()
    });

    this.router.navigate(['/']);
  }
}
