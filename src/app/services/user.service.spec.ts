import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatDialog} from '@angular/material/dialog';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpTestingController,
          useValue: {}
        },
        {
          provide: HttpClientTestingModule,
          useValue: {}
        },
        {
          provide: HttpClientModule,
          useValue: {}
        },
        {
          provide: HttpClient,
          useValue: {}
        }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should be created test', () => {
    expect(service).toBeTruthy();
  });
});
