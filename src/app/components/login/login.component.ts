import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  loginForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password: new FormControl('', [Validators.required])
  });
  constructor() { }
  onSave() {
    this.isLoading = true;
  }
  ngOnInit(): void {
  }

}
