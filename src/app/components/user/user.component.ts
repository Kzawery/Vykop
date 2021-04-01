import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {MatDialog} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('statsAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.50)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('500ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight:  '*',
          paddingLeft: '*',
        })),
        animate(100)
      ])
    ]),
  ]
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
