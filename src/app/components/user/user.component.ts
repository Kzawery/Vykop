import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  id: number;

  constructor(private userService: UserService, private route: ActivatedRoute, private authenticationService: AuthenticationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.user.username = paramMap.get('username');
      this.userService.getByUsername(this.user.username).subscribe(user => {
        this.user = user;
      });
    });
  }

  profile() {
      this.authenticationService.currentUser.subscribe( user =>
        this.id = user.id,
      );
      const dialogRef = this.dialog.open(UserProfileComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {id: this.id},
      });
      dialogRef.afterClosed().subscribe(result => {
        // this.reloadData();
    });
  }
}
