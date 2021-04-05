import {Component, HostBinding, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
          animate(300, style({height: 0})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),
        group([
          animate(300, style({height: '*'})),
          animate('400ms ease-in-out', style({'opacity': '1'}))
        ])

      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  constructor(private userService: UserService, private webSocket: WebsocketService) { }
  chatToogle = false;
  chatToogleUp = true;
  userMessages = [];
  msgToogle = false;
  msgReceiver: any;
  chatMessages = [];
  text: String;
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ngOnInit(): void {
    this.userService.getContactedUsers().subscribe(r => {
      this.userMessages = r;
    });
  }

  async toogleChatOff() {
    this.chatToogle = !this.chatToogle;
    await this.delay(350);
    this.chatToogleUp = !this.chatToogleUp;
  }
  toogleChat() {
    this.chatToogle = !this.chatToogle;
    this.chatToogleUp = !this.chatToogleUp;
  }
  toogleMsg(user: any) {
    this.msgToogle = !this.msgToogle;
    if (this.msgToogle) {
      this.msgReceiver = user;
      this.getMsg()
    }
  }
  send() {
    const msg = {
        'to': this.msgReceiver.username,
        'content': this.text,
      };
    this.webSocket.sendMsg(msg);
    this.text = '';
    this.getMsg();
  }
  getMsg() {
    this.userService.getMsg(this.msgReceiver.username).subscribe( r =>{
      this.chatMessages = r;
      console.log(this.chatMessages);
    });
  }
  /*
    msgTest =
    {
      'to': 'admin',
      'content': 'krolowa poki',
    };
   */
}
