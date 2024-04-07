import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginRequestResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public login(credentials: any): Observable<UserLoginRequestResponse> {
    return this.http.post<UserLoginRequestResponse>('http://localhost:8000/api/login', credentials)
  }

  public register(credentials: any): Observable<UserLoginRequestResponse> {
    return this.http.post<UserLoginRequestResponse>('http://localhost:8000/api/register', credentials)
  }
}
