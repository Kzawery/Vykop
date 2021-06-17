import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap} from '@angular/router';
import { SubredditComponent } from './subreddit.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../services/authentication.service';
import {of} from 'rxjs';

describe('SubredditComponent', () => {
  let component: SubredditComponent;
  let fixture: ComponentFixture<SubredditComponent>;
  let service: AuthenticationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({id: 1})) }
        },
        {
          provide: Router,
          useValue: { }
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
          useValue: {open: () => {}, afterClosed: () => {}}
        }, AuthenticationService,
      ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SubredditComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthenticationService);
    // service.currentUserValue.username = 'admin';
    // service.currentUserSubject.value.username = 'admin';
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('variableInitiation', () => {
    it('isSub should be false', () => {
      expect(component.isSub).toEqual(false);
    });
    it('index should be 0', () => {
      expect(component.index).toEqual(0);
    });
    it('busyGettingData should be false', () => {
      expect(component.busyGettingData).toEqual(false);
    });
  });
  describe('functionsTest', () => {
    it('onScroll should call fetchMore', () => {
      spyOn(component, 'fetchMore');
      component.onScroll();
      expect(component.fetchMore).toHaveBeenCalled();
    });
  });
});
