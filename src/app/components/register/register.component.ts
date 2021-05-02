import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  hide = true;
  validCredentials = true;

  registerForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private router: Router, private userService: UserService) { }
  onLoginClick() {
      this.router.navigate(['login']);
  }
  onSave() {
    this.isLoading = true;
    const form = {
        'username': this.registerForm.get('form_basic_username').value,
        'password': this.registerForm.get('form_basic_password').value,
        'email':  this.registerForm.get('email').value,
      };
    this.userService.register(form)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          this.validCredentials = true;
          this.router.navigate(['/login']);
        },
        () => {
          this.validCredentials = false;
          this.isLoading = false;
        });
  }

  ngOnInit(): void {
  }
}
