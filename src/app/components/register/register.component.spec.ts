import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {AbstractControl, FormGroup} from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: routerSpy
        }],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('isLoading should be false', () => {
      const variable = component.isLoading;
      expect(variable).toBe(false);
    });
    it('hide should be true', () => {
      const variable = component.hide;
      expect(variable).toBe(true);
    });
    it('validCredentials should be true', () => {
      const variable = component.validCredentials;
      expect(variable).toBe(true);
    });
  });
  describe('routerTest', () => {
    it('should go to login', () => {
      component.onLoginClick();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['login']);
    });
  });
  describe('createForm', () => {
    describe('register control', () => {
      it('username should fail required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_username');
        control.setValue(null);
        expect(control.hasError('required')).toBeTruthy();
      });
      it('username should pass required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_username');
        control.setValue('user');
        expect(control).toBeTruthy();
      });
      it('password should fail required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue(null);
        expect(control.hasError('required')).toBeTruthy();
      });
      it('password should fail pattern validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue('password');
        expect(control.hasError('pattern')).toBeTruthy();
      });
      it('password should pass pattern validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue('!Password123');
        expect(control).toBeTruthy();
      });
      it('password should pass required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue('password');
        expect(control).toBeTruthy();
      });
      it('email should fail required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('email');
        control.setValue(null);
        expect(control.hasError('required')).toBeTruthy();
      });
      it('email should pass required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('email');
        control.setValue('email');
        expect(control).toBeTruthy();
      });
      it('email should fail required validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('email');
        control.setValue('email');
        expect(control.hasError('email')).toBeTruthy();
      });
      it('email should pass email validator', () => {
        const form: FormGroup = component.registerForm;
        const control: AbstractControl = form.get('email');
        control.setValue('email@gmail.com');
        expect(control).toBeTruthy();
      });
    });
  });
  describe('error Handling test', () => {
    it('should show error for InvalidCredentials', () => {
      component.validCredentials = false;
      let errorSpan = fixture.nativeElement.querySelector('.error');
      expect(errorSpan).toBeTruthy();
      expect(errorSpan.textContent).toBe(' User with same credentials already exists ');
    });
  });
});
