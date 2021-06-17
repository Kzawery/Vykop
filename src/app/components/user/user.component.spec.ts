import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EMPTY, of} from 'rxjs';
import {User} from '../../models/user';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const mockActivatedRoute = {
    paramMap: of(convertToParamMap({username: 'user'}))
  };
  beforeEach(  () => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: mockActivatedRoute
      },
        {
          provide: MatDialog,
          useValue: {open: () => { }}
        },
        {
          provide: MatDialogRef,
          useValue: {afterClosed: () => {}}
        },
        {
          provide: BrowserAnimationsModule,
          useValue: {}
        }
      ],
      imports: [HttpClientModule,  BrowserAnimationsModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = new User();
    component.user.username = 'user';
    component.id = 1;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openTests', () => {
    it('should open the dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => EMPTY} as any);
      component.profile();
      expect(dialogSpy).toHaveBeenCalled();
    });
    });
});
