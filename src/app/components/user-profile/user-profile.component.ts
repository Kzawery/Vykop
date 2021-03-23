import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserProfileComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) {}
  isLoading = false;
  form = new FormData();
  hide = true;
  userDB: User = new User();
  files;
  registerForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (this.data) {
      console.log("test")
      console.log(this.data)
      this.userService.getById(this.data.id).subscribe( u => {
        console.log(u);
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

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          // this.isLoading = true;
          this.form.append('file', file, droppedFile.relativePath);
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.userDB.avatar = reader.result.toString();
          };
        });
      }
    }
  }


  onEdit() {
    this.isLoading = true;
    this.form.append('id', this.userDB.id.toString());
    this.form.append('username', this.registerForm.get('form_basic_username').value);
    this.form.append('password', this.registerForm.get('form_basic_password').value);
    this.form.append('registrationDate', this.userDB.registrationDate);
    this.form.append('email', this.registerForm.get('email').value);
    console.log(this.form.get('username'));
    this.userService.edit(this.form)
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
