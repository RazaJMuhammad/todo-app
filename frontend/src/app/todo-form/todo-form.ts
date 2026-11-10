import { Component, Input, Output, EventEmitter, inject, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TodoService } from '../services/todo';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm implements OnInit {
  @Output() todoSaved = new EventEmitter<void>();
  @Output() todoCancelled = new EventEmitter<void>();
  @Input() existingTodo: Todo | null = null;

  errorMessage: string = '';

  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private ngZone = inject(NgZone);

  todoForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: [1]
  });

  ngOnInit(): void {
    if (this.existingTodo) {
      this.todoForm.patchValue({
        title: this.existingTodo.title,
        description: this.existingTodo.description,
        priority: this.existingTodo.priority
      });
    }
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }
    const formData = this.todoForm.value;
    this.errorMessage = '';

    if (this.existingTodo) {
      const updatedTodo = {
        ...this.existingTodo,
        ...formData
      };
      this.todoService.updateTodo(this.existingTodo.id, updatedTodo).subscribe({
        next: (response) => {
          this.ngZone.run(() => {
            console.log('Todo updated successfully:', response);
            this.handleSuccess();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Failed to update todo:', err);
            this.errorMessage = 'Failed to update todo. Please try again.';
          });
        }
      });
    } else {
      this.todoService.createTodo(formData).subscribe({
        next: (response) => {
          this.ngZone.run(() => {
            console.log('Todo created successfully:', response);
            this.handleSuccess();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            console.error('Failed to create todo:', err);
            this.errorMessage = 'Failed to create todo. Please try again.';
          });
        }
      });
    }
  }

  
  private handleSuccess(): void {
    this.todoForm.reset({ priority: 1 }); // Clear form and reset defaults
    this.errorMessage = '';
    this.todoSaved.emit();
  }

  cancelEdit(): void {
    this.todoForm.reset({ priority: 1 });
    this.errorMessage = '';
    this.todoCancelled.emit();
  }
}
