import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {FeedComponent} from '../feed/feed.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SubvykopService} from '../../services/subvykop.service';
import { Client, Message } from '@stomp/stompjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  loading = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  busyGettingData = false;
  message: string;
  parentData: any;
  listItems2 = [];
  i = 0;
  private feed: FeedComponent;
  clinet = new Client();
  msgTest =
    {
      'to': 'admin',
      'content': 'Potezny chuj',
      'from': 'admin'
    };

onScroll() {
  this.fetchMore();
}

  childMsg(event) {
    this.message = event;
  }
  constructor(fb: FormBuilder, private ngZone: NgZone, private router: Router,
              private authenticationService: AuthenticationService, private userService: UserService,
              private postService: PostService, public dialog: MatDialog, private _snackBar: MatSnackBar, public subVykopService: SubvykopService
  ) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  console.log(this.msgTest);
  this.feed = new FeedComponent(this.ngZone, this.authenticationService, this.userService, this.postService, this.router, this._snackBar, this.subVykopService);
  this.fetchMore();
  this.init();
  }
  addPost() {
    const dialogRef = this.dialog.open(PostAddComponent, {
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  fetchMore(): void {
    this.postService.getForUser(this.i).subscribe(data => {
      for (const post of data) {
        this.listItems2.push(post);
      }
      this.i += 1;
      console.log(this.feed.i);
      console.log(data);
      this.parentData = this.listItems2;
      this.feed.busyGettingData = false;
    }, error => {
      this.feed.loading = false;
      this.feed.busyGettingData = false;
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  init() {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws/websocket',
      connectHeaders: {
        login: 'admin',
        passcode: '!Password123',
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    this.clinet = client;
    this.clinet.onConnect = function (frame) {
    };

    this.clinet.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.clinet.activate();
  }

  sendMsg() {
    this.clinet.subscribe('/user/admin/queue', this.callback);
    this.clinet.publish({
      destination: '/chat/send',
      body: JSON.stringify(this.msgTest),
    });
  }
  callback(){
  }
}
