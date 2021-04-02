import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Title} from '@angular/platform-browser';
import {OnInit} from '@angular/core';
import {FeedComponent} from './components/feed/feed.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: Title
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // this.setTitle();
  }

}
