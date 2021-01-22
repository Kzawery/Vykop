import {AfterViewInit, Component, HostListener, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Router} from '@angular/router';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  title = 'Angular Infinite Scrolling List';
  listItems = [];
  loading = false;
  i = 0 ;
  busyGettingData = false;
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private postService: PostService, private router: Router) { }

  @Input() childProperty;
  private posts: Post[];

  ngOnInit(): void {
    this.fetchMore();
  }
  onScroll() {
    this.fetchMore();
  }

  likeBtnClick(element: Post) {
    this.postService.upvote(element.id).subscribe(resp => {
      this.refresh(element);
      // this._snackBar.open('You like this comment', 'hide',  {
      //   duration: 2000,
      // });
    });
  }
  refresh(element: Post): void {
    this.postService.getPost(element.id).subscribe(p => {
      element = p;
    });
  }
  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }

  fetchMore(): void {
    this.busyGettingData = true;
    this.postService.getForUser(this.i).subscribe(data => {
      for (const post of data) {
        this.listItems.push(post);
      }
      this.i += 1;
      console.log(this.i);
      console.log(data);
      this.busyGettingData = false;
    }, error => {
      this.loading = false;
      this.busyGettingData = false;
    });
  }

}
