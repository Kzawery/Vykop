import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  deleteById(id) {
    return this.http.delete<any>(`${environment.apiUrl}/users/` + id);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  register(data) {
    return this.http.post(`${environment.apiUrl}/users/signup`, data);
  }

  add(data) {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }

  edit(data) {
    return this.http.put(`${environment.apiUrl}/users/` + data.id, data);
  }

}
