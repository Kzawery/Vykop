import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
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

  constructor(private ngZone: NgZone, private route: ActivatedRoute, public postService: PostService,
              public auth: AuthenticationService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @Input() commnets: any[] = [];
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
  text  =  '';

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id_post = paramMap.get('id');
    });
    this.refresh();
    this.comment = '';
  }

  refresh(): void {
    this.postService.getPost(this.id_post).subscribe(p => {
      this.post = p;
      this.upvoted = p.upvoted;
    });
  }

  handleEmoji(e, element)  {
    if (element != null) {
      element.text += e.char;
    } else {
      this.comment += e.char;
    }
  }

  handleCharDelete(e, element)  {
    if (element != null) {
      if (element.text.length >  0) {
        element.text =  element.text.substr(0,  element.text.length -  2);
      }
    }  else {
      if (this.text.length > 0) {
        this.text = this.text.substr(0, this.text.length - 2);
      }
    }
  }

  likeBtnClick(element: Comment, i: number) {
    if (element.upvoted) {
      this.commnets[i].votes -= 1;
      element.upvoted = false;
    } else {
      this.commnets[i].votes += 1;
      element.upvoted = true;
    }

    this.postService.upvoteComment(element.id).subscribe();
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
  }

  editCommentSave(element: Comment): void {
    element.isEdited = !element.isEdited;
    console.log('text: ' + element.text);
    console.log('id: ' + element.id);
    console.log('id post: ' + this.post.id);
    this.postService.editComment(this.post.id, element.id, element.text).subscribe(resp => {
      console.log(resp);
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
      this.isToggled = false;
      }
    );
  }
}
