import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/post';
import {PostService} from '../../../services/post.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  constructor(private ngZone: NgZone, private route: ActivatedRoute, public postService: PostService, public auth: AuthenticationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id_post = paramMap.get('id');
    });
    this.refresh();
    this.fetchMore();
  }
  refresh(): void {
    this.postService.getPost(this.id_post).subscribe(p => {
      this.post = p;
    });
  }
  onScroll() {
    this.fetchMore();
  }

  likeBtnClick(event) {
    console.log(event);
  }

  fetchMore(): void {
  }

  addComment(): void {
    this.postService.addComment(this.id_post, this.comment).subscribe( resp => {
      this.refresh();
      this._snackBar.open('Comment have been added', 'hide',  {
        duration: 2000,
      });
      }
    );
  }
}
