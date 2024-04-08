import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoRequestResponse } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() { }

  public getTodoByUserId(): Observable<TodoRequestResponse> {
    return this.http.get<TodoRequestResponse>('http://localhost:8000/api/todos', {
      headers: {
        'Authorization': 'Bearer ' + this.storageService.getToken(),
      }
    });
  }
}
