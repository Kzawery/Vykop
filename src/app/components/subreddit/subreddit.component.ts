import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubVykop} from '../../models/subVykop';
import {SubvykopService} from '../../services/subvykop.service';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  subreddit: SubVykop = new SubVykop();
  listItems = [];
  imageURL: string;
  loading = false;
  subredditId: any;
  isSub = false;
  parentData: any;
  index = 0;
  noPosts: boolean;
  busyGettingData = false;
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private subvykopService: SubvykopService,
              private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
              private _snackbar: MatSnackBar, private postService: PostService) { }

  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }
  joinSubVykop() {
    this.subvykopService.subscribe(this.subredditId).subscribe(resp => {
      console.log(resp);
      if (resp === 'subscribed') {
      this._snackbar.open('You have joined this community!', 'hide',  {
        duration: 2000,
      });         this.isSub = true;
      } else {
        this._snackbar.open('You have left the community!', 'hide',  {
          duration: 2000,
        });         this.isSub = false;
      }
    });
  }


  addPost() {
    const dialogRef = this.dialog.open(PostAddComponent, {
      hasBackdrop: true,
      data: this.subreddit.name
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit(): void {
    this.noPosts = false;
    this.route.paramMap.subscribe( paramMap => {
      this.subredditId = paramMap.get('id');
    });
    this.subvykopService.getSubVykopById(this.subredditId).subscribe(resp => {
      this.subreddit = resp;
      this.imageURL = resp.banner;
      this.fetchMore();
    });
    this.subvykopService.checkSub(this.subredditId).subscribe(resp => {
      if (resp) {
        this.isSub = true;
      } else {
        this.isSub = false;
      }
    });
  }

  onScroll() {
    this.fetchMore();
  }

  likeBtnClick(element: Post, i) {
    this.postService.upvote(element.id).subscribe(resp => {
      this.refresh(element, i);
      console.log(resp);
      });
  }
  refresh(element: Post, i): void {
    this.postService.getPost(element.id).subscribe(p => {
      element = p;
      this.listItems[i].votes = element.votes;
    });
  }

  fetchMore(): void {
    this.busyGettingData = true;
    this.subvykopService.getPostBySubVykopName(this.subreddit.name, this.index).subscribe(data => {
      console.log(this.index);
      for (const post of data) {
        this.listItems.push(post);
      }
      this.parentData = this.listItems;
      this.busyGettingData = false;
      this.index ++ ;
    },
      error1 => {
        this.busyGettingData = false;
        this.noPosts = true;
      });
  }

}
