import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap} from '@angular/router';
import { SubredditComponent } from './subreddit.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';

describe('SubredditComponent', () => {
  let component: SubredditComponent;
  let fixture: ComponentFixture<SubredditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: Observable.create(convertToParamMap({id: 1})) }
        },
        {
          provide: Router,
          useValue: {}
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
        },
      ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
