import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../../../models/user';

@Component({
  selector: 'app-user-managament',
  templateUrl: './user-managament.component.html',
  styleUrls: ['./user-managament.component.css']
})
export class UserManagamentComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserManagamentComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService) {}
  isLoading = false;
  hide = true;
  userDB: User;
  registerForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (this.data) {
      this.userService.getById(this.data.id).subscribe( u => {
        this.userDB = u;
        this.updateForm();
      });
    }
  }

  updateForm() {
    this.registerForm.patchValue({
      form_basic_username: this.userDB.username,
      form_basic_password: this.userDB.password,
      email: this.userDB.email,
      role: this.userDB.role,
    });
  }

  onBack(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.isLoading = true;
    const form = {
      'username': this.registerForm.get('form_basic_username').value,
      'password': this.registerForm.get('form_basic_password').value,
      'email':  this.registerForm.get('email').value,
      'role': this.registerForm.get('role').value
    };
    this.userService.add(form)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          this.dialogRef.close();
          this._snackBar.open('User have been added', 'hide',  {
            duration: 2000,
          });
        },
        error => {
          this.isLoading = false;
        });
  }

  onEdit() {
    this.isLoading = true;
    const form = {
      'id': this.userDB.id,
      'username': this.registerForm.get('form_basic_username').value,
      'password': this.registerForm.get('form_basic_password').value,
      'registrationDate': this.userDB.registrationDate,
      'email':  this.registerForm.get('email').value,
      'role': this.registerForm.get('role').value
    };
    this.userService.edit(form)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
          this.dialogRef.close();
          this._snackBar.open('User have been edited', 'hide',  {
            duration: 2000,
          });
        },
        error => {
          this.isLoading = false;
        });
  }
}
