import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../../models/post';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  comments = [];
  loading = false;
  addCommentField = false;
  id_post: any;
  item = {
    title: 'List Item ' + 1,
    content: 'Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker',
    image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS92eisuWOx3tEjeW14mT9ACVgXDwIRBGtnww&usqp=CAU`,
    user: 'username',
    subreddit: 'subreddit',
    upvoted: true,
    downvoted: false
  };
  post: Post;
  constructor(private ngZone: NgZone, private route: ActivatedRoute, public postService: PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.id_post = paramMap.get('id');
    });
    this.postService.getPost(this.id_post).subscribe(p => {
      this.post = p;
    });
    this.fetchMore();
  }
  onScroll() {
    this.fetchMore();
  }

  likeBtnClick(event) {
    console.log(event);
  }

  fetchMore(): void {
    const myMap =  ['Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker ', 'value2', 'value3', 'value4'];
    const comments = [];
    for (let i = 0; i < 20; i++) {
      comments.push({
        comment: `${myMap[i]}`,
        votes: Math.round(Math.random() * 1000)
      });
    }

    this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.comments = [...this.comments, ...comments];
    });

  }
}
