import {Component, Inject, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {PostService} from '../../../services/post.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Post} from '../../../models/post';
import {Container} from '@angular/compiler/src/i18n/i18n_ast';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  public formData = new FormData();
  public files: NgxFileDropEntry[] = [];
  isLoading = false;
  imageURL: string | ArrayBuffer;
  public currentUser = this.authenticationService.currentUserValue;
  public post = new Post();
  title: string;
  text: string;

  // tslint:disable-next-line:max-line-length
  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<PostAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public postService: PostService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          this.isLoading = true;
          this.formData.append('file', file, droppedFile.relativePath);
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageURL = reader.result;
          };
        });
      }
    }
  }

  public removeImg(){
    this.formData.delete('file');
    this.imageURL = null;
  }

  public addPost() {
    /*
    const form = {
      'content': {
        'text': this.text,
      },
      'author': this.currentUser,
      'title': this.title,
    };
    */

    this.formData.append('title', this.title);
    this.formData.append('text', this.text);
    console.log(this.formData.get('title'));
    this.postService.addPost(this.formData).subscribe(x => {
        this.dialogRef.close();
        this.isLoading = false;
          this._snackBar.open('Post have been added', 'hide',  {
            duration: 2000,
          }); },
      error => {
        this.isLoading = false;
        this._snackBar.open('Sorry, there was an error with your post', 'hide',  {
          duration: 2000,
        });
      });
  }
}
