import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { NewTodo } from '../../models/newTodo';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private http = inject(HttpClient);
    private apiUrl = 'https://localhost:7177/api/todos';

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    createTodo(todo: NewTodo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    updateTodo(id: number, todo: Todo): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<void>(url, todo);
    }

    deleteTodo(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}