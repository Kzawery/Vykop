import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ActivatedRoute, Router} from '@angular/router';
import {SubVykop} from '../../models/subVykop';
import {SubvykopService} from '../../services/subvykop.service';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  subredditName: any;
  isSub = false;
  parentData: any;
  index = 0;
  noPosts: boolean;
  busyGettingData = false;
  banner: string;
  postIds = [];
  constructor(private subvykopService: SubvykopService, private route: ActivatedRoute, public dialog: MatDialog,
              private _snackbar: MatSnackBar) { }

  joinSubVykop() {
    this.subvykopService.subscribe(this.subreddit.id).subscribe(resp => {
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
      this.listItems.unshift(result);
      this.postIds.push(result.id);
    });
  }

  ngOnInit(): void {
    this.noPosts = false;
    this.route.paramMap.subscribe( paramMap => {
      this.subredditName = paramMap.get('id');
    });
    this.subvykopService.searchSubs(this.subredditName).subscribe(resp => {
      this.subreddit = resp[0];
      this.banner = resp[0].banner;
      this.fetchMore();
      this.checkSub();
      console.log(this.banner);
      console.log(resp[0].avatar);
    });
  }

  checkSub() {
    this.subvykopService.checkSub(this.subreddit.id).subscribe(resp => {
      this.isSub = !!resp;
    });
  }

  onScroll() {
    if (!this.noPosts) {
      this.fetchMore();
    }
  }

  fetchMore(): void {
    this.busyGettingData = true;
    this.subvykopService.getPostBySubVykopName(this.subreddit.name, this.index).subscribe(data => {
      for (const post of data) {
        if (!this.postIds.includes(post.id)) {
          this.listItems.push(post);
          this.postIds.push(post.id);
        }
      }
      this.parentData = this.listItems;
      this.busyGettingData = false;
      this.index ++ ;
    },
      () => {
        this.busyGettingData = false;
        this.noPosts = true;
      });
  }
}
