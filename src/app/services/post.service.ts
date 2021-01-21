import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';


@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Post[]>(`${environment.apiUrl}/userposts`);
  }

  addPost(post) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, post);
  }

}
