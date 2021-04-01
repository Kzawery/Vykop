import {Component, Input, NgZone, OnInit, SimpleChanges, ViewChild, OnChanges} from '@angular/core';
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
  listItems = [];
  trendingSubs = [];
  popularUsers = [];
  loading = false;
  i = 0 ;
  busyGettingData = false;
  postLoaded = true;
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private postService: PostService,
              private router: Router, private _snackBar: MatSnackBar, private subVykopService: SubvykopService) { }

  @Input() posts: any[];

  deleteBtnClick(element: Post) {
    this.postService.deletePost(element.id).subscribe(resp => {
      window.location.reload();
      this._snackBar.open('You deleted your post', 'hide',  {
        duration: 2000,
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
    this.postService.upvote(element.id).subscribe(resp => {
      // this.refresh(element, i);
      // console.log(resp);
      // this._snackBar.open('You like this post', 'hide',  {
      //   duration: 2000,
      // });
    });
  }
  refresh(element: Post, i): void {
    this.postService.getPost(element.id).subscribe(p => {
      element = p;
      // this.posts[i].votes = element.votes;
    });
  }
  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
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
        model.score = Object.values(item)[4];
        model.logo = item.avatar;
        this.popularUsers.push(model);
      }
    });
  }

  ngOnChanges(changes: any) {
   if ( changes.posts.length > 0) {
     this.postLoaded = false;
   }
  }
}
