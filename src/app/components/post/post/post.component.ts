import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/post';
import {PostService} from '../../../services/post.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Comment} from '../../../models/comment';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  loading = false;
  addCommentField = false;
  id_post: any;
  post: Post = new Post();
  comment: string;
  toggled: boolean;
  message: string;

  constructor(private ngZone: NgZone, private route: ActivatedRoute, public postService: PostService,
              public auth: AuthenticationService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

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
    });
  }

  likeBtnClick(element: Comment) {
    this.postService.upvoteComment(element.id).subscribe(resp => {
      this.refresh();
      this._snackBar.open('You like this comment', 'hide',  {
        duration: 2000,
      });
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
      }
    );
  }
}
