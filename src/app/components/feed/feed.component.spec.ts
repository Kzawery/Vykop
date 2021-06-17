import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Post} from '../../models/post';
import any = jasmine.any;

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        }],
      imports: [HttpClientModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('variableInitialization', () => {
    it('trendingSubs should be empty', () => {
      expect(component.trendingSubs).toEqual([]);
    });
    it('popularUsers should be empty', () => {
      expect(component.popularUsers).toEqual([]);
    });
    it('posts should be empty', () => {
      expect(component.posts).toEqual([]);
    });
    it('noPosts should be false', () => {
      expect(component.noPosts).toEqual(false);
    });
    it('i should be 0', () => {
      expect(component.i).toEqual(0);
    });
    it('busyGettingData should be false', () => {
      expect(component.busyGettingData).toEqual(false);
    });
    it('postLoaded should be true', () => {
      expect(component.postLoaded).toEqual(true);
    });
  });
  describe('functionsTest', () => {
    it('likeBtn should call likeBtnClick', () => {
      spyOn(component, 'likeBtnClick');
      const post = new Post();
      component.likeBtnClick(post, 1);
      expect(component.likeBtnClick).toHaveBeenCalled();
    });
    it('goToSubVykop should go to subVykop', () => {
      const element = 1;
      component.goToSubVykop(element);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['subVykop/' + element]);
    });
  });
  afterEach(() => {
    fixture.destroy();
  });
});
