import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';
import {SubVykop} from '../models/subVykop';


@Injectable({ providedIn: 'root' })
export class SubvykopService {
  constructor(private http: HttpClient) { }

  getPostBySubVykopName(name, index) {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts/` + name + `/?page=` + index);
  }

  searchSubs(name) {
    return this.http.get<SubVykop[]>(`${environment.apiUrl}/sub_vykop/search?match=` + name);
  }

  subscribe(id) {
    return this.http.post(`${environment.apiUrl}/subvykop/subscribe`, id, { responseType: 'text'});
  }
  checkSub(id) {
    return this.http.get<any>(`${environment.apiUrl}/subvykop/` + id + `/isSubscribed`);
  }
  getSubVykopById(id) {
    return this.http.get<SubVykop>(`${environment.apiUrl}/sub_vykop/` + id);
  }
  joinSubVykop(id) {
    return this.http.get<Response>(`${environment.apiUrl}/subvykop/` + id + `/subscribe/`);
  }
  checkIfMember(id) {
    return this.http.get<Response>(`${environment.apiUrl}/subvykop/` + id + `/isSubscribed/`);
  }

  addPost(post) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, post);
  }

  addComment(id, value) {
    return this.http.post<Post>(`${environment.apiUrl}/posts/` + id + '/comment', value);
  }

}
