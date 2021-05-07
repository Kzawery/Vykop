import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SubvykopService} from '../../services/subvykop.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {BehaviorSubject} from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: AuthenticationService;
  let routerSpy = {navigate: jasmine.createSpy('navigate'), url: '/subvykop'};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
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
          provide: MatDialog,
          useValue: {}
        },  AuthenticationService],
      imports: [HttpClientModule, MatAutocompleteModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('routerTest', () => {
    it('should go to login', () => {
      component.logout();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
    it('should go to manage', () => {
      component.manage();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
    it('should go to users', () => {
      service.currentUserSubject = new BehaviorSubject<User>( new User());
      service.currentUserValue.username = 'user';
      component.profile();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['u/user']);
    });
    it('should go to given subVykop with provided name', () => {
      component.goTo('test');
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/subVykop/test']);
    });
  });
  describe('variableInitialization', () => {
    it('subs should be empty', () => {
      expect (component.subs).toHaveSize(0);
      });
  });
});
