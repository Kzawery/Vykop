import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  hide = true;
  loginForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password: new FormControl('', [Validators.required])
  });
  constructor(  private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit( ): void {
  }

  onSave() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('form_basic_username').value, this.loginForm.get('form_basic_password').value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.authenticationService.currentUserValue);
          console.log(data);
          window.location.replace(window.location.origin);
        },
        error => {
          this.loading = false;
        });
  }

    toRegister() {
    this.router.navigate(['/register']);
  }
}
