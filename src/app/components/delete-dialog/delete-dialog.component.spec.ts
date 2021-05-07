import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  const data: any = {
    id: 10,
    model: 'post',
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {open: () => { }}
        },
        {
          provide: MatDialogRef,
          useValue: { close: () => { }}
        },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('clousureTests', () => {
    it('should close the dialog onNoClick()', () => {
      spyOn(component.dialogRef, 'close');
      component.onNoClick();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
    it('should close the dialog onYesClick()', () => {
      spyOn(component.dialogRef, 'close');
      component.onYesClick();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
    it('should open SnackBack on with function onYesClick()', () => {
      spyOn(component.dialogRef, 'close');
      spyOn(component._snackBar, 'open');
      component.onYesClick();
      expect(component._snackBar.open).toHaveBeenCalled();
    });
  });
  describe('injectedVariables', () => {
    it('id should be equal injected value', () => {
      expect(component.id).toEqual(10);
    });
    it('model should be equal injected value', () => {
      expect(component.model).toEqual('post');
    });
  });
});
