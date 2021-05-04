import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [        {
        provide: ActivatedRoute,
        useValue: {}
      },
        {
          provide: Router,
          useValue: routerSpy
        },
        {provide: FormBuilder}],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('routerTest', () => {
    it('should go to register', () => {
      component.toRegister();
      expect (routerSpy.navigate).toHaveBeenCalledWith(['/register']);
    });
  });
  describe('createForm', () => {
    describe('login control', () => {
      it('username should fail required validator', () => {
        const form: FormGroup = component.loginForm;
        const control: AbstractControl = form.get('form_basic_username');
        control.setValue(null);
        expect(control.hasError('required')).toBeTruthy();
      });
      it('password should fail required validator', () => {
        const form: FormGroup = component.loginForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue(null);
        expect(control.hasError('required')).toBeTruthy();
      });
      it('username should pass required validator', () => {
        const form: FormGroup = component.loginForm;
        const control: AbstractControl = form.get('form_basic_username');
        control.setValue('user');
        expect(control).toBeTruthy();
      });
      it('password should pass required validator', () => {
        const form: FormGroup = component.loginForm;
        const control: AbstractControl = form.get('form_basic_password');
        control.setValue('password');
        expect(control).toBeTruthy();
      });
    });
  });

});
