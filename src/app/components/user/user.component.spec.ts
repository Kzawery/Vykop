import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {User} from '../../models/user';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const mockActivatedRoute = {
    paramMap: of({ username: 'user' })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [      {
        provide: ActivatedRoute,
        useValue: mockActivatedRoute
      },
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: BrowserAnimationsModule,
          useValue: {}
        }
      ],
      imports: [HttpClientModule,  BrowserAnimationsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = new User();
    component.user.username = 'user';
    component.id = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
