import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubvykopService} from '../../services/subvykop.service';
import {SubVykop} from '../../models/subVykop';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Post} from '../../models/post';

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
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private subvykopService: SubvykopService,
              private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public _snackbar: MatSnackBar) { }



  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }
  joinSubVykop() {
    this.subvykopService.subscribe(this.subredditId).subscribe(resp => {
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
    this.route.paramMap.subscribe( paramMap => {
      this.subredditId = paramMap.get('id');
    });
    this.subvykopService.getSubVykopById(this.subredditId).subscribe(resp => {
      this.subreddit = resp;
      this.imageURL = resp.banner;
      this.fetchMore();
    });
  }

  refresh(): void {
    // this.subvykopService.getPost(this.subredditId).subscribe(p => {
    //   // this.post = p;
    // });
  }

  onScroll() {
    this.fetchMore();
  }

  likeBtnClick(event) {
    console.log(event);
  }

  fetchMore(): void {
    this.subvykopService.getPostBySubVykopName(this.subreddit.name).subscribe(data => {
      console.log(data); // Tu sciaga ci posty dla danego uzytkownika, modele dorobilem takie jak w bazie danych
      for (const post of data) {
        this.listItems.push(post);
      }
    });
  }
}
