import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagamentComponent } from './user-managament.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('UserManagamentComponent', () => {
  let component: UserManagamentComponent;
  let fixture: ComponentFixture<UserManagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagamentComponent ],
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
          useValue: {}
        }],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('hide should be true', () => {
      expect (component.hide).toBeTrue();
    });
    it('isLoading should be false', () => {
      expect (component.isLoading).toBeFalse();
    });
    it('registerForm should be initialized', () => {
      expect (component.registerForm).toBe(new FormGroup({
        form_basic_username: new FormControl('', [Validators.required]),
        form_basic_password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', [Validators.required])
      }));
    });
  });
  describe('functionsTest', () => {
    it('onBack should close dialog', () => {
      spyOn(component.dialogRef, 'close');
      component.onBack();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
    it('updateForm should call patchValues', () => {
      spyOn(component.registerForm, 'patchValue');
      component.updateForm();
      expect(component.registerForm.patchValue).toHaveBeenCalled();
    });
  });
});
