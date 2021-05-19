import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {FeedComponent} from '../feed/feed.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SubvykopService} from '../../services/subvykop.service';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  loading = false;
  busyGettingData = false;
  message: string;
  parentData: any;
  noPosts = false;
  listItems2 = [];
  i = 0;
  private feed: FeedComponent;

  onScroll() {
    if (!this.noPosts) {
      this.fetchMore();
    }
  }

  constructor( private ngZone: NgZone, private router: Router,
              private authenticationService: AuthenticationService, private userService: UserService,
              private postService: PostService, public dialog: MatDialog,
              private _snackBar: MatSnackBar, public subVykopService: SubvykopService,
              private webSocket: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.webSocket.init();
    this.feed = new FeedComponent(this.ngZone, this.authenticationService, this.userService,
      this.postService, this.router, this._snackBar, this.subVykopService, this.dialog);
    this.fetchMore();
  }
  ngAfterViewInit(): void {
    this.webSocket.afterInit();
  }
  addPost() {
    const dialogRef = this.dialog.open(PostAddComponent, {
      hasBackdrop: true,
    });
  }

  fetchMore(): void {
    this.postService.getForUser(this.i).subscribe(data => {
      for (const post of data) {
        this.listItems2.push(post);
      }
      this.i += 1;
      if (data.length === 0) {
          this.noPosts = true;
      }
      this.parentData = this.listItems2;
      this.feed.busyGettingData = false;
    }, () => {
      this.noPosts = true;
      this.feed.busyGettingData = false;
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
