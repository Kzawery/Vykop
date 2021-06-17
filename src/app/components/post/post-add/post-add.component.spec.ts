import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { PostAddComponent } from './post-add.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

describe('PostAddComponent', () => {
  let component: PostAddComponent;
  let fixture: ComponentFixture<PostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAddComponent ],
      imports: [MatSnackBarModule],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: HttpClient, useValue: {}},
        { provide: ActivatedRoute, useValue: {} }
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('variableInitiation', () => {
    it('title should be empty string', () => {
      expect(component.title).toBe('');
    });
    it('text should be empty string', () => {
      expect(component.text).toBe('');
    });
    it('isLoading should be false', () => {
      expect(component.isLoading).toBe(false);
    });
    it('edited should be false', () => {
      expect(component.edited).toBe(false);
    });
    it('formData should be empty instance of FromData', () => {
      expect(component.formData).toEqual(new FormData());
    });
    it('formData should be empty instance of FromData', () => {
      expect(component.formData).toEqual(new FormData());
    });
  });
  describe('functionsTest', () => {
    it('removeImg should remove image', () => {
      spyOn(component, 'removeImg');
      component.removeImg();
      expect(component.imageURL).toBe(null);
    });
  });
});
