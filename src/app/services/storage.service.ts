import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem('user') as string);
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('token') as string;
  }

  public clearStorage(): void {
    sessionStorage.clear();
  }
}
