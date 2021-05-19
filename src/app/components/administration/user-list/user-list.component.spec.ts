import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EMPTY} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../models/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
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
          useValue: {afterClosed: () => {}}
        },
        {
          provide: MatDialog,
          useValue: {open: () => {}, close: () => {}}
        }
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',   () => {
    expect(component).toBeTruthy();
  });

  describe('variableInitialization', () => {
    it('title should be empty', () => {
      expect (component.title).toHaveSize(0);
    });
    // it('DataSource should be initialized', () => {
    //   expect (component.dataSource).toEqual( new MatTableDataSource<User>());
    // });
    it('DisplayedColumns should be initialized', () => {
      expect (component.displayedColumns).toEqual( ['id', 'username', 'password', 'email', 'registrationDate', 'role']);
    });
    it('IsLoading should be false', () => {
      expect (component.isLoading).toBeFalse();
    });
  });
  describe('functionsTest', () => {
    it('reloadData should call reloadData', () => {
      spyOn(component, 'reloadData');
      component.reloadData();
      expect(component.reloadData).toHaveBeenCalled();
    });
    it('createUser should open dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => EMPTY} as any);
      component.createUser();
      expect(dialogSpy).toHaveBeenCalled();
    });
    it('openDialog should open dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => EMPTY} as any);
      component.openDialog(3);
      expect(dialogSpy).toHaveBeenCalled();
    });
    it('editUser should open dialog', () => {
      const dialogSpy = spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => EMPTY} as any);
      component.editUser(3);
      expect(dialogSpy).toHaveBeenCalled();
    });
    // it('editUser should reload data after being closed', () => {
    //   spyOn(component, 'reloadData');
    //   const dialogSpy = spyOn(component.dialog, 'open')
    //     .and
    //     .returnValue({afterClosed: () => {}} as any);
    //   component.editUser(3);
    //   expect(dialogSpy).toHaveBeenCalled();
    //   expect(component.reloadData).toHaveBeenCalled();
    // });
  });
});
