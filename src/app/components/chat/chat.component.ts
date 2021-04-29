import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';
import {WebsocketService} from '../../services/websocket.service';
import {WebSocketAPI} from '../../services/WebSocketApi.service';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

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
  constructor(private userService: UserService, private webSocket: WebsocketService) {}
  chatToggle = false;
  chatToggleUp = true;
  userMessages = [];
  msgToggle = false;
  msgReceiver: any;
  chatMessages = [];
  searchedUsers = [];
  isLoading = false;
  page = 0;
  text: String;
  scrollHeight = 0;
  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('scrollMe', { static: false }) myScrollContainer: ElementRef;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  ngOnInit(): void {
    this.userService.getContactedUsers().subscribe(r => {
      this.userMessages = r;
      this.userService.getLoggedUsers().subscribe(res => {
        const messages = this.userMessages.reduce(function(previousValue, currentValue) {
          if (res.includes(currentValue.username)) {
            currentValue.online = true;
          }
          previousValue.push(currentValue);
          return previousValue;
        }, []);
      });
    });
    this.webSocket.missionConfirmed$.subscribe(
      msg => {
        this.chatMessages.push(msg);
        this.myScrollContainer.nativeElement.scrollIntoView();
      });
    this.webSocket.LogConfirmedSource$.subscribe(
      msg => {
        this.userMessages.forEach( el => {
          if (el.username === msg) {
            el.online = true;
          }
        });
      });
    this.webSocket.LogoutConfirmedSource$.subscribe(
      msg => {
        this.userMessages.forEach( el => {
          if (el.username === msg) {
            el.online = false;
          }
        });
      });
  }
  onScroll($event) {

    const elem: HTMLElement = $event.srcElement;

    if (elem.scrollTop < 1) { elem.scrollTo(0, 1); }

    if (this.isLoading) { return; }

    if (elem.scrollTop < 20) {
      this.isLoading = true;
      this.userService.getMsgByPage(this.msgReceiver.username, this.page).subscribe( r => {
        this.page++;
        r = r.reverse();
        r.forEach(v => {
          this.chatMessages.unshift(v);
        });
        this.isLoading = false;
        console.log(this.chatMessages);
        elem.scrollTo(0, 1);
      }, error => {
        console.log('No new messages');
        this.isLoading = false;
      });
    }
  }
  async toggleChatOff() {
    this.chatToggle = !this.chatToggle;
    await this.delay(350);
    this.chatToggleUp = !this.chatToggleUp;
  }
  toggleChat() {
    this.chatToggle = !this.chatToggle;
    this.chatToggleUp = !this.chatToggleUp;
  }
  async toggleMsg(user: any) {
    this.msgToggle = false;
    if (this.msgReceiver === user) {
      this.msgReceiver = null;
    } else {
      this.msgReceiver = user;
      this.getMsg();
      await this.delay(350);
      this.msgToggle = true;
      await this.delay(50);
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }
  send() {
    const msg = {
        'to': this.msgReceiver.username,
        'content': this.text,
      };
    this.webSocket.sendMsg(msg);
    this.text = '';
  }
  getMsg() {
    this.userService.getMsg(this.msgReceiver.username).subscribe( r => {
      this.chatMessages = r;
      this.page = 1;
    }, error => {
      this.chatMessages = null;
    });
  }
  filter(name: String) {
    this.userService.getUsersByName(name).subscribe(r => {
      this.searchedUsers = r;
    });
  }
}
