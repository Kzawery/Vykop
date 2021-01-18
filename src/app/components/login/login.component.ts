import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {AppRoutingModule} from '../../app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  loading = false;
  submitted = false;
  loginForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password: new FormControl('', [Validators.required])
  });
  constructor(  private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
  }
  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('form_basic_username').value, this.loginForm.get('form_basic_password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
        });
  }

}
