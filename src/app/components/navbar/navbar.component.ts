import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
<<<<<<< Updated upstream
import {SubvykopService} from '../../services/subvykop.service';
import {SubVykop} from '../../models/subVykop';
=======
import {UserManagamentComponent} from '../administration/user-managament/user-managament.component';
import {MatDialog} from '@angular/material/dialog';
import {UserProfileComponent} from '../user-profile/user-profile.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  id: number;
  floatLabelControl = new FormControl('auto');
  public subs: SubVykop[] = [];
  constructor(fb: FormBuilder, private ngZone: NgZone,    private router: Router,
<<<<<<< Updated upstream
              // tslint:disable-next-line:max-line-length
              public authenticationService: AuthenticationService, private userService: UserService, private postService: PostService, private subService: SubvykopService) {
=======
              public authenticationService: AuthenticationService, private userService: UserService, private postService: PostService,
              public dialog: MatDialog) {
>>>>>>> Stashed changes
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue.role);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
<<<<<<< Updated upstream

  manage() {
    this.router.navigate(['/users']);
  }
  filter(event: String) {
    this.subs = [];
    this.subService.searchSubs(event).subscribe( data => {
      let converter: SubVykop[];
      converter = data;
      for (const item of converter) {
        console.log(item);
        this.subs.push(item);
      }
    });
  }

  goTo(sub: number) {
    this.router.navigate(['/subVykop/' + 4]);
  }


=======
  profile() {
      this.authenticationService.currentUser.subscribe( user =>
        this.id = user.id,
      );
    console.log(this.id);
      const dialogRef = this.dialog.open(UserProfileComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {id: this.id},
      });
      dialogRef.afterClosed().subscribe(result => {
        // this.reloadData();
      });
    }
    manage() {
    this.router.navigate(['users']);
    }
>>>>>>> Stashed changes
}
