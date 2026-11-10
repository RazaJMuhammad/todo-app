import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { TodoService } from '../services/todo';
import { Todo } from '../../models/todo';
import { TodoForm } from '../todo-form/todo-form';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoForm],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  todos: Todo[] = [];
  isLoading = true;
  errorMessage: string = '';
  selectedTodo: Todo | null = null;
  showForm = false;
  deletingId: number | null = null;


  private todoService = inject(TodoService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadTodos();
  }

  onTodoSaved(): void {
    this.selectedTodo = null;
    this.showForm = false;
    this.loadTodos();
  }

  handleCancel(): void {
    this.selectedTodo = null;
    this.showForm = false;
  }

  showCreateForm(): void {
    this.selectedTodo = null;
    this.showForm = true;
  }

  private async loadTodos(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const data = await firstValueFrom(this.todoService.getAllTodos());
      this.todos = data;
      console.log('Fetched todos:', this.todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      this.errorMessage = 'Failed to load todos. Please check if the backend is running.';
    } finally {
      this.isLoading = false;
      console.log(this.isLoading);
      this.cdr.detectChanges();
    }
  } 


  getPriorityLabel(priority: number): string {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Low';
    }
  }

  async toggleComplete(todo: any): Promise<void> {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };

    try {
      await firstValueFrom(this.todoService.updateTodo(updatedTodo.id, updatedTodo));
      todo.isComplete = updatedTodo.isComplete;
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Failed to update todo status', err);
      this.errorMessage = 'Failed to update todo status. Please try again.';
      this.cdr.detectChanges();
    }
  }

  async deleteTodo(id: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    this.deletingId = id;
    this.cdr.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      await firstValueFrom(this.todoService.deleteTodo(id));
      this.deletingId = null;
      this.loadTodos();
    } catch (err) {
      console.error('Failed to delete todo', err);
      this.errorMessage = 'Failed to delete todo. Please try again.';
      this.deletingId = null;
      this.cdr.detectChanges();
    }
  }

  onEdit(todo: Todo): void {
    this.selectedTodo = todo;
    this.showForm = true;
    console.log('Editing item updated to:', this.selectedTodo);
  }

}
