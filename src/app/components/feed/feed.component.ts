import {AfterViewInit, Component, HostListener, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  title = 'Angular Infinite Scrolling List';
  listItems: Post[] = [];
  loading = false;


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

  likeBtnClick(event) {
    console.log(event);
  }

  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }

  fetchMore(): void {
    this.postService.getAll().subscribe(data => {
      console.log(data); // Tu sciaga ci posty dla danego uzytkownika, modele dorobilem takie jak w bazie danych
      for (const post of data) {
        newItems.push(post);
      }

    });
     const newItems = [];
     this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.listItems = [...this.listItems, ...newItems];
    });

  }

}
