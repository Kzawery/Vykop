import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  text1 = '';
  constructor(private router: Router, private matDialog: MatDialog, private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  login(form: NgForm): void {
    const {email, password} = form.value;


    // if (!form.valid) {
    //   return;
    // }
    this.http.get<string>('http://localhost:8080/posts' ).subscribe(data => {
      this.text1 = data;
    });

    console.log(this.text1);

    form.resetForm();
  }

  openRegister(): void {
    const dialogRef = this.matDialog.open(RegisterComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const {fname, lname, email, password, avatar} = result;

      if (result !== undefined) {
        // this.authService.SignUp(email, password, fname, lname, avatar);
      }

      return;
    });
  }


}
interface Credentials {
  email: string;
  password: string;
}
