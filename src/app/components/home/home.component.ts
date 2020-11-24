import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterComponent} from '../register/register.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PostComponent} from '../post/post.component';
import {ElementRef,Renderer2} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private matDialog: MatDialog) {  }

  ngOnInit(): void {
  }

  openPost(): void {
    const dialogRef = this.matDialog.open(PostComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const {fname, lname, email, password, avatar} = result;



      if (result !== undefined) {}

      return;
    });
  }
}
