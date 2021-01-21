import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {PostAddComponent} from '../post/post-add/post-add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';

  loading = false;

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');


  message: string;
  parentData: any;

onScroll() {
  console.log('Chuj');
}

  childMsg(event) {
    this.message = event;
  }
  constructor(fb: FormBuilder, private ngZone: NgZone,    private router: Router,
              // tslint:disable-next-line:max-line-length
              private authenticationService: AuthenticationService, private userService: UserService, private postService: PostService, public dialog: MatDialog) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.postService.getAll().subscribe(data => {
      console.log(data); // Tu sciaga ci posty dla danego uzytkownika, modele dorobilem takie jak w bazie danych
      this.parentData = data;
    });
  }
  addPost() {
    const dialogRef = this.dialog.open(PostAddComponent, {
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  fetchMore(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
