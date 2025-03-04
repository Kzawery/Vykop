import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';


@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Post[]>(`${environment.apiUrl}/userposts?page=0`);
  }
  getForUser(i) {
    return this.http.get<Post[]>(`${environment.apiUrl}/userposts?page=` + i);
  }

  getPost(id) {
    return this.http.get<Post>(`${environment.apiUrl}/post?id=` + id );
  }

  upvote(id) {
    return this.http.post(`${environment.apiUrl}/posts/upvote/` + id, []);
  }
  addPost(post) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, post);
  }

  editPost(id, post) {
    return this.http.put<Post>(`${environment.apiUrl}/posts/edit/` + id, post);
  }

  addComment(id, value) {
    return this.http.post<Post>(`${environment.apiUrl}/posts/` + id + '/comment', value);
  }

  deleteComment(id) {
    return this.http.delete<Post>(`${environment.apiUrl}/comments/` + id);
  }

  deletePost(id) {
    return this.http.delete<Post>(`${environment.apiUrl}/posts/` + id);
  }

  upvoteComment(id) {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/comments/upvote/` + id);
  }

  editComment(post_id, comment_id, value) {
    return this.http.post<Post>(`${environment.apiUrl}/posts/` + post_id + '/comment/' + comment_id, value);
  }

}
