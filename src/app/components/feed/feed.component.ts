import {AfterViewInit, Component, HostListener, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {timer} from 'rxjs';
import {EventEmitter} from 'events';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {User} from '../../models/user';
import {Content} from '../../models/content';
import {Post} from '../../models/post';

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


  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private postService: PostService) { }

  @Input() childProperty;
  private posts: Post[];

  ngOnInit(): void {
    this.fetchMore();
  }
  onScroll() {
    console.log('Chuj');
    this.fetchMore();
  }

  likeBtnClick(event) {
    console.log(event);
  }

  fetchMore(): void {
    this.postService.getAll().subscribe(data => {
      console.log(data); // Tu sciaga ci posty dla danego uzytkownika, modele dorobilem takie jak w bazie danych
      for (const post of data) {
        newItems.push({
          id: post.id,
          author: post.author,
          votes: post.votes,
          content: post.content,
          creationDate: post.creationDate,
          comments:  post.comments
        });
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
