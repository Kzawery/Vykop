import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {timer} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UserManagamentComponent} from '../administration/user-managament/user-managament.component';
import {PostAddComponent} from '../post/post-add/post-add.component';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  subreddit = {name: '', banner: '', icon: ''};
  listItems = [];
  loading = false;

  constructor(private ngZone: NgZone, public dialog: MatDialog ) { }


  subredditConts(name, banner, icon) {
    this.subreddit = {
      name: name,
      banner: banner,
      icon: icon
    };
  }

  createPost(title, content, image, user, subreddit){
    this.listItems.push({
      title: title,
      content: content,
      image: image,
      user: user,
      subreddit: subreddit
    });
  }

  ngOnInit(): void {
    this.fetchMore();
    this.subredditConts('wallstreetbets', 'https://static.toiimg.com/photo/72975551.cms', 'https://www.flaticon.com/svg/vstatic/svg/4062/4062980.svg?token=exp=1611230439~hmac=a6b8d57c1b53c4c16af64ea7862b347a');
  }
  onScroll() {
    console.log('Chuj');
    this.fetchMore();
  }

  likeBtnClick(event) {
    console.log(event);
  }

  fetchMore(): void {
    const images = ['https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80', 'https://static.toiimg.com/photo/72975551.cms', 'YW3F-https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80', 'https://www.filmibeat.com/ph-big/2019/07/ismart-shankar_156195627930.jpg' , 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS92eisuWOx3tEjeW14mT9ACVgXDwIRBGtnww&usqp=CAU'];
    const newItems = [];
    for (let i = 0; i < 20; i++) {
      const randomListNumber = Math.round(Math.random() * 100);
      const randomPhotoId = Math.round(Math.random() * 4);
      newItems.push({
        title: 'List Item ' + randomListNumber,
        content: 'This is some description of the list - item # ' + randomListNumber,
        image: `${images[randomPhotoId]}`,
        user: 'username',
        subreddit: 'subreddit'
      });
    }
    this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.listItems = [...this.listItems, ...newItems];
    });

  }

}
