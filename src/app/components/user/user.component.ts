import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {MatDialog} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';
import {Chart} from 'node_modules/chart.js';
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
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('400ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class UserComponent implements OnInit {

  user: User = new User();
  id: number;
  stats: Object;

  constructor(private userService: UserService, private route: ActivatedRoute, private authenticationService: AuthenticationService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe( user =>
      this.id = user?.id,
    );
    this.route.paramMap.subscribe(paramMap => {
      this.user.username = paramMap.get('username');
      this.userService.getByUsername(this.user.username).subscribe(user => {
        this.user = user;
      });
      this.userService.getStatsByUsername(this.user.username).subscribe( stats => {
        this.addData(myChart, stats);
        console.log(stats);
      });
    });
    const myChart = new Chart('chart', {
      type: 'horizontalBar',
      data: {
        labels: ['Posts', 'Post Upvotes', 'Comments', 'Comment Upvotes'],
        datasets: [{
          label: '',
          data:[ ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
          }]
        },
        legend: {
          display: false
        },
        animation: {
          duration: 2000,
        },
      }
    });
  }

  profile() {
      const dialogRef = this.dialog.open(UserProfileComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {id: this.id},
      });
      dialogRef.afterClosed().subscribe(result => {
        // this.reloadData();
    });
  }
  addData(chart, stats) {
    chart.data.datasets[0].data[0] = Object.values(stats)[4];
    chart.data.datasets[0].data[1] = Object.values(stats)[0];
    chart.data.datasets[0].data[2] = Object.values(stats)[1];
    chart.data.datasets[0].data[3] = Object.values(stats)[3];
    chart.update();
  }

}
