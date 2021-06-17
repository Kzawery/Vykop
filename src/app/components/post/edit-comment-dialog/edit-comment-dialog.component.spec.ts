import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentDialogComponent } from './edit-comment-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';

describe('EditCommentDialogComponent', () => {
  let component: EditCommentDialogComponent;
  let fixture: ComponentFixture<EditCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommentDialogComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {close: () => { }}
        },
        {
          provide: MatSnackBar,
          useValue: {open: () => { }}
        },
        {
          provide: BrowserAnimationsModule,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {id: 1, model: 'Model', commentText: 'commentText', post_id: 1} },
      ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitialization', () => {
    it('id should be 1', () => {
      expect (component.id).toBe(1);
    });
    it('model should be Model', () => {
      expect (component.model).toBe('Model');
    });
    it('commentText should be commentText', () => {
      expect (component.commentText).toBe('Model');
    });
    it('post_id should be 1', () => {
      expect (component.post_id).toBe(1);
    });
  });
  describe('clousureTests', () => {
    it('should close the dialog onNoClick()', () => {
      spyOn(component.dialogRef, 'close');
      component.onNoClick();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
    it('should close the dialog onYesClick()', () => {
      spyOn(component.dialogRef, 'close');
      spyOn(component._snackBar, 'open');
      component.onYesClick();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });
});
