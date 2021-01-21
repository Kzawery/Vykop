import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';


@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Post[]>(`${environment.apiUrl}/userposts?page=0`);
  }

  getPost(id) {
    return this.http.get<Post>(`${environment.apiUrl}/post?id=` + id );
  }

  addPost(post) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, post);
  }

  addComment(id, value) {
    return this.http.post<Post>(`${environment.apiUrl}/posts/` + id + '/comment', value);
  }

}
