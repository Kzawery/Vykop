import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SubvykopService} from '../../services/subvykop.service';
import {StatsItem} from '../../models/statsItem';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('200ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])
    ])
  ]
})
export class FeedComponent implements OnInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  title = 'Angular Infinite Scrolling List';
  trendingSubs = [];
  popularUsers = [];
  i = 0 ;
  busyGettingData = false;
  postLoaded = true;
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private postService: PostService,
              private router: Router, private _snackBar: MatSnackBar,
              private subVykopService: SubvykopService, public dialog: MatDialog) { }

  @Input() posts: any[] = [];
  @Input() noPosts = false;
  deleteBtnClick(element: Post) {
    this.postService.deletePost(element.id).subscribe(resp => {
      this.posts.forEach((el, index) => {
        if (el.id === element.id) { this.posts.splice(index, 1); }
      });
      this._snackBar.open('You deleted your post', 'hide',  {
        duration: 2000,
      });
    });
  }
  editBtnClick(element: Post, index: number) {
    const dialogRef = this.dialog.open(PostAddComponent, {
      hasBackdrop: true,
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
          this.postService.getPost(element.id).subscribe(resp => {
            this.posts[index].title = resp.title;
            this.posts[index].content.text = resp.content.text;
            this.posts[index].content.image  =  resp.content.image;
            console.log(resp.content.image);
          });
    });
  }

  likeBtnClick(element: Post, i) {
    if (element.upvoted) {
      this.posts[i].votes -= 1;
      element.upvoted = false;
    } else {
      this.posts[i].votes += 1;
      element.upvoted = true;
    }
    this.postService.upvote(element.id).subscribe();
  }

  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }
  goToSubVykop(event) {
    this.router.navigate(['subVykop/' + event]);
  }

  ngOnInit(): void {
    this.subVykopService.getMostPopularSubVykops().subscribe(r => {
      for ( const item of r) {
        const model = new StatsItem();
        model.name = item.name;
        model.score = Object.values(item)[5];
        model.logo = item.avatar;
        this.trendingSubs.push(model);
      }
    });
    this.userService.getMostPopularUsers().subscribe(r => {
      for ( const item of r) {
        const model = new StatsItem();
        model.name = item.username;
        model.score = Object.values(item)[5];
        model.logo = item.avatar;
        this.popularUsers.push(model);
      }
    });
  }
}
