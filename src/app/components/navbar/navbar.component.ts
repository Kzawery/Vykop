import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {PostService} from '../../services/post.service';
import {SubvykopService} from '../../services/subvykop.service';
import {SubVykop} from '../../models/subVykop';
import {MatDialog} from '@angular/material/dialog';
import {AddSubVykopComponent} from '../add-sub-vykop/add-sub-vykop.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id: number;
  public subs: SubVykop[] = [];

  constructor(private router: Router,
              public authenticationService: AuthenticationService,
              private postService: PostService, private subService: SubvykopService, public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  manage() {
    this.router.navigate(['/users']);
  }

  filter(event: String) {
    this.subService.searchSubs(event).subscribe(data => {
      let converter: SubVykop[];
      converter = data;
      this.subs.length = 0;
      this.subs = [];
      for (const item of converter) {
        this.subs.push(item);
      }
    });
    this.subs = this.subs.filter((el, i, a) => i === a.indexOf(el));
  }
  addSubVykop() {
    const addSub = this.dialog.open(AddSubVykopComponent, {
      hasBackdrop: true,
    });
    addSub.afterClosed().subscribe(resp => {
      if (resp != null) {
        this.router.navigate(['/subVykop/']);
      }
    });
  }

  goTo(sub: string) {
    if (this.router.url.includes('subVykop')) {
      this.router
        .routeReuseStrategy
        .shouldReuseRoute = function () {
        return false;
      };
      this.router.navigateByUrl('/subVykop/' + sub);
    } else {
      this.router.navigate(['/subVykop/' + sub]);
    }
  }

  profile() {
    this.router.navigate(['u/' + this.authenticationService.currentUserValue.username]);
  }
}
