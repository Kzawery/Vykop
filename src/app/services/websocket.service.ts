import {EventEmitter, Injectable} from '@angular/core';
import {Client} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public missionConfirmedSource: Subject<any>;
  missionConfirmed$;
  constructor(private authenticationService: AuthenticationService) {
    this.missionConfirmedSource = new Subject<string>();
    this.missionConfirmed$ = this.missionConfirmedSource.asObservable();
  }
  client = new Client();
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  async afterInit() {
    await this.delay(4000);
    this.client.subscribe('/messages/' + this.authenticationService.currentUserValue.username + '/queue', this.callback);
  }
  sendMsg(msg) {
    this.client.publish({
      destination: '/chat/send',
      body: JSON.stringify(msg),
    });
  }
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
  callback = (message) => {
    const _this = this;
    this.confirmMission(JSON.parse(message.body));
  }
}


