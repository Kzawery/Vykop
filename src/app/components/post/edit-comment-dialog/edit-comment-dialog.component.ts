import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.css']
})
export class EditCommentDialogComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditCommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public postService: PostService) { }

  id: number = this.data.id;
  model: String = this.data.model;
  commentText: String = this.data.model;
  post_id: number = this.data.post_id;

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this._snackBar.open('You\'ve edited comment!', '', {
      duration: 2000,
    });
    this.postService.editComment(this.post_id, this.id, this.commentText);
    console.log(this.id + ' ' + this.commentText);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
