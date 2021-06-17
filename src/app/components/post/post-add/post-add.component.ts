import {Component, Inject, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {PostService} from '../../../services/post.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Post} from '../../../models/post';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  public formData = new FormData();
  public files: NgxFileDropEntry[] = [];
  isLoading = false;
  imageURL: string | ArrayBuffer = null;
  public currentUser = this.authenticationService.currentUserValue;
  public post = new Post();
  title = '';
  text = '';
  subVykop: string;
  edited = false;

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<PostAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public postService: PostService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.data.id !== undefined) {
      this.post = this.data;
      this.subVykop = this.data.subVykop.name;
      this.imageURL = this.post.content.image;
      this.title = this.post.title;
      this.text = this.post.content.text;
      this.edited = true;
    } else {
      this.subVykop = this.data;
    }
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

  public removeImg() {
    this.formData.delete('file');
    this.imageURL = null;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public addPost() {
    this.formData.append('title', this.title);
    this.formData.append('text', this.text !== undefined ? this.text : '');
    this.formData.append('subVykop', this.subVykop);
    if (this.imageURL != null) {
      console.log('imageURL: ' + this.imageURL.toString());
      this.formData.append('image', this.imageURL.toString());
    } else {
      console.log('imageURL: ' + null);
      this.formData.append('image', null);
    }
    if (this.edited) {
      this.postService.editPost(this.post.id, this.formData).subscribe( x => {
        this.dialogRef.close(x);
        this._snackBar.open('Post have been edited', 'hide',  {
          duration: 2000,
        });
      }, error => {
        this._snackBar.open('Sorry, there was an error with your post', 'hide',  {
          duration: 2000,
        });
      });
    } else {
    this.postService.addPost(this.formData).subscribe(x => {
        this.dialogRef.close(x);
        this.isLoading = false;
          this._snackBar.open('Post have been added', 'hide',  {
            duration: 2000,
          });
          },
      error => {
        this.isLoading = false;
        this._snackBar.open('Sorry, there was an error with your post', 'hide',  {
          duration: 2000,
        });
      });
  }}
}
