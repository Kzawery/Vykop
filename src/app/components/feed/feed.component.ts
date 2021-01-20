import {AfterViewInit, Component, HostListener, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';
  listItems = [];
  loading = false;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.fetchMore();
  }
  onScroll() {
    this.fetchMore();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
        this.ngZone.run(() => {
          this.fetchMore();
        });
      }
    );
  }
  checkOverflow (element) {
    if (element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth) {
      return true;
    } else {
      return false;
    }
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
        show: false
      });
    }

    this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.listItems = [...this.listItems, ...newItems];
    });

  }

}
