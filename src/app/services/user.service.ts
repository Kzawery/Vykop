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
  getProfile() {
    return this.http.get<User>(`${environment.apiUrl}/u/me`);
  }

  getByUsername(username: String) {
    return this.http.get<User>(`${environment.apiUrl}/u/` + username);
  }

  getStatsByUsername(username: String) {
    return this.http.get(`${environment.apiUrl}/users/${username}/stats`);
  }

  register(data) {
    return this.http.post(`${environment.apiUrl}/users/signup`, data);
  }

  add(data) {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }

  edit(data) {
    return this.http.put(`${environment.apiUrl}/users/` + data.get('id'), data);
  }
  getMostPopularUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/most_popular`);
  }

  getContactedUsers() {
    return this.http.get<any>(`${environment.apiUrl}/chat/contacted_users`);
  }

  getMsg(data) {
    return this.http.get<any>(`${environment.apiUrl}/messages/${data}?page=0`);
  }


}
