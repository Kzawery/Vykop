import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {of} from 'rxjs';
import {A} from '@angular/cdk/keycodes';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
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
          useValue: {afterClosed: () => {}}
        },
        {
          provide: MatDialog,
            useValue: { open: () => {}}
        },
        {
          provide: AuthenticationService,
          useValue: { currentUserValue: {
              username: 'user'
            }, logout: () => {}}
        }
        ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
  describe('variableInitiation', () => {
    it('loading should be false', () => {
      expect(component.loading).toEqual(false);
    });

    it('busyGettingData should be false', () => {
      expect(component.busyGettingData).toEqual(false);
    });

    it('busyGettingData should be false', () => {
      expect(component.noPosts).toEqual(false);
    });

    it('busyGettingData should be false', () => {
      expect(component.listItems2).toHaveSize(0);
    });

    it('iteration should be equal to 0', () => {
      expect(component.i).toEqual(0);
    });
  });
  describe('functionsTest', () => {
    it('onScroll should call fetchMore', () => {
      spyOn(component, 'fetchMore');
      component.onScroll();
      expect(component.fetchMore).toHaveBeenCalled();
    });
    it('onScroll should call fetchMore', () => {
      spyOn(component, 'fetchMore');
      component.onScroll();
      expect(component.fetchMore).toHaveBeenCalled();
    });
    it('logout() should go to login', () => {
      component.logout();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
    it('addPost() should open dialog', () => {
      spyOn(component.dialog, 'open');
      component.addPost();
      expect(component.dialog.open).toHaveBeenCalled();
    });
  });
});
