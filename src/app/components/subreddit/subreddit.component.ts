import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubVykop} from '../../models/subVykop';
import {SubvykopService} from '../../services/subvykop.service';

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
  constructor(private ngZone: NgZone, private authenticationService: AuthenticationService,
              private userService: UserService, private subvykopService: SubvykopService,
              private router: Router, private route: ActivatedRoute) { }

  goToPost(event) {
    this.router.navigate(['post/' + event.id]);
  }
  joinSubVykop() {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.subredditId = paramMap.get('id');
    });



    this.subvykopService.getSubVykopById(this.subredditId).subscribe(resp => {
      this.subreddit = resp;
      this.imageURL = resp.banner;
      console.log(resp);
      console.log(this.subreddit.name);
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
