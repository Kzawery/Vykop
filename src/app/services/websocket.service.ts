import { Injectable } from '@angular/core';
import {Client} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private authenticationService: AuthenticationService) { }
  client = new Client();
  static callback(message) {
    console.log(JSON.parse(message.body));
  }
  init() {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      connectHeaders: {
        login: this.authenticationService.currentUserValue.username,
        passcode: localStorage.getItem('password')
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    this.client = client;
    this.client.onConnect = function (frame) {
    };

    this.client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    this.client.activate();
  }

  afterInit() {
    this.client.subscribe('/messages/' + this.authenticationService.currentUserValue.username + '/queue', WebsocketService.callback);
  }
  sendMsg(msg) {
    this.client.publish({
      destination: '/chat/send',
      body: JSON.stringify(msg),
    });
  }
}

