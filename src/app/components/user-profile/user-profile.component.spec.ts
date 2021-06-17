import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('loading should be false', () => {
      expect(component.isLoading).toBeFalse();
    });
    it('form should be empty FormData', () => {
      expect(component.form).toEqual(new FormData());
    });
    it('hide should be true', () => {
      expect(component.hide).toBeTrue();
    });
    // it('register form should be initialized', () => {
    //   const form = new FormGroup({
    //     form_basic_username: new FormControl('', [Validators.required]),
    //     form_basic_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')]),
    //     email: new FormControl('', [Validators.required, Validators.email])
    //   });
    //   expect(component.registerForm).toEqual(form);
    // });
  });
});
