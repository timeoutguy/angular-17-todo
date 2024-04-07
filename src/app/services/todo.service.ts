import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoRequestResponse } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);

  constructor() { }

  public getTodoByUserId(): Observable<TodoRequestResponse> {
    return this.http.get<TodoRequestResponse>('http://localhost:8000/api/todos', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
