import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false;

  registerForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) { }
  onLoginClick(){
      this.router.navigate(['login'])
  }
  onSave(){
    this.isLoading = true;
  }
  ngOnInit(): void {
  }

}
