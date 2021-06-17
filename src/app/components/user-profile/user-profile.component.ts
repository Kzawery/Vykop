import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserProfileComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  isLoading = false;
  form = new FormData();
  hide = true;
  userDB: User = new User();
  files;
  registerForm = new FormGroup({
    form_basic_username: new FormControl('', [Validators.required]),
    form_basic_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit(): void {
    if (this.data) {
      console.log('test');
      console.log(this.data);
      console.log(this.registerForm);
      this.userService.getById(this.data.id).subscribe(u => {
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

  editUser(usernameEdited) {
    this.userService.edit(this.userDB)
      .pipe(first())
      .subscribe(
        data => {
          if (!usernameEdited) {
            this.isLoading = false;
            this.dialogRef.close();
            this._snackBar.open('User have been edited', 'hide', {
              duration: 2000,
            });
          }
          if (usernameEdited) {
            this.authenticationService.logout().then(() => {
                this.authenticationService.login(this.userDB.username, this.userDB.password)
                  .pipe(first())
                  .subscribe(
                    d => {
                      console.log(this.authenticationService.currentUserValue);
                      console.log(d);
                      window.location.replace(window.location.origin);
                    });
              }
            );
          }
        },
        error => {
          this.isLoading = false;
        });
  }

  onEdit() {
    const usernameEdited = this.userDB.username !== this.registerForm.get('form_basic_username').value;
    this.isLoading = true;
    if (usernameEdited) {
      this.userService.getByUsername(this.registerForm.get('form_basic_username').value).pipe(first()).subscribe(d => {
        this.isLoading = false;
        this._snackBar.open('Username was already taken', 'hide', {
          duration: 2000,
        });
      }, error => {
        this.userDB.email = this.registerForm.get('email').value;
        this.userDB.username = this.registerForm.get('form_basic_username').value;
        this.userDB.password = this.registerForm.get('form_basic_password').value;
        if (this.form.get('file') != null) {
          this.userService.setAvatar(this.form).subscribe(() => {
            this.editUser(usernameEdited);
          });
        } else {
          this.editUser(usernameEdited);
        }
      });

  } else {
        this.userDB.email = this.registerForm.get('email').value;
        this.userDB.username = this.registerForm.get('form_basic_username').value;
        this.userDB.password = this.registerForm.get('form_basic_password').value;
        if (this.form.get('file') != null) {
          this.userService.setAvatar(this.form).subscribe(() => {
            this.editUser(usernameEdited);
          });
        } else {
          this.editUser(usernameEdited);
        }
    }
  }
}
