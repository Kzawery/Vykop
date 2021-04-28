import {Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {User} from '../models/user';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WebSocketAPI {
  constructor(private http: HttpClient) { }

  getUsersByName(name) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/search?match=` + name);
  }
}
