import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/post';
import {PostService} from '../../../services/post.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Comment} from '../../../models/comment';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EditCommentDialogComponent} from '../edit-comment-dialog/edit-comment-dialog.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private ngZone: NgZone, private route: ActivatedRoute, public postService: PostService,
              public auth: AuthenticationService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  loading = false;
  addCommentField = false;
  upvoted = false;
  user = this.auth.currentUserValue;
  id_post: any;
  isToggled = false;
  post: Post = new Post();
  comment: string;
  toggled: boolean;
  message: string;
  isEdited: boolean;
  text  =  '';
  editedText = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id_post = paramMap.get('id');
    });
    this.refresh();
    this.comment = '';
  }
  handleSelection(event) {
    this.comment += event.char;
  }
  refresh(): void {
    this.postService.getPost(this.id_post).subscribe(p => {
      this.post = p;
      this.upvoted = p.upvoted;
    });
  }

  handleEmoji(e)  {
    this.comment +=  e.char;
    // console.log('Emoji Name',  e);
  }

  handleCharDelete(e)  {
    if (this.text.length >  0) {
      this.text =  this.text.substr(0,  this.text.length -  2);
    }
  }

  likeBtnClick(element: Comment) {
    this.postService.upvoteComment(element.id).subscribe(resp => {
      this.refresh();
      // this.post.upvoted = !this.post.upvoted;
      this._snackBar.open('You like this comment', 'hide',  {
        duration: 2000,
      });
    });
  }

  likeBtnClickPost() {
    this.postService.upvote(this.post.id).subscribe(resp => {
      this.refresh();
    });
  }
  openDialog(element: Comment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      disableClose: true,
      hasBackdrop: true,
      data: {id: element.id, model: 'Comment'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(element);
      }
    });
  }

  editComment(element: Comment): void {
    element.isEdited = !element.isEdited;
    this.editedText = element.text;
    if (!element.isEdited) {
        const dialogRef = this.dialog.open(EditCommentDialogComponent, {
          width: '250px',
          disableClose: false,
          hasBackdrop: true,
          data: {id: element.id, model: element.text, post_id: this.post.id},
        });
    }
  }

  editCommentSave(element: Comment): void {
    element.isEdited = !element.isEdited;
  }

  deleteComment(element: Comment): void {
    this.postService.deleteComment(element.id).subscribe(resp => {
      this.refresh();
      this._snackBar.open('You have deleted your comment', 'hide', { duration: 2000
  });
});
}
  addComment(): void {
    this.postService.addComment(this.id_post, this.comment).subscribe( resp => {
      this.refresh();
      this.addCommentField = false;
      this.comment = '';
      this._snackBar.open('Comment have been added', 'hide',  {
        duration: 2000,
      });
      this.isToggled = false;
      }
    );
  }
}
