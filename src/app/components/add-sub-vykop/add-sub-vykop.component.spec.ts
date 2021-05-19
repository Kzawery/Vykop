import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubVykopComponent } from './add-sub-vykop.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {SubVykop} from '../../models/subVykop';

describe('AddSubVykopComponent', () => {
  let component: AddSubVykopComponent;
  let fixture: ComponentFixture<AddSubVykopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubVykopComponent ],
      providers: [
        {
        provide: MatDialog,
        useValue: {}
      },
        {
          provide: MatDialogRef,
          useValue: {close: () => { }}
        }],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubVykopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('variableInitiation', () => {
    it('subVykop should be equal to an empty SubVykop class', () => {
      expect(component.subVykop).toEqual(new SubVykop());
    });

    it('isLoading should be false', () => {
      expect(component.isLoading).toEqual(false);
    });

    it('subVykopForm should be equal to empty instance of Form Data', () => {
      expect(component.subVykopForm).toEqual(new FormData());
    });
  });
  describe('clousureTests', () => {
    it('should close the dialog onBack()', () => {
      spyOn(component.dialogRef, 'close');
      component.onBack();
      expect(component.dialogRef.close).toHaveBeenCalled();
      });
    it('should close the dialog onEdit()', () => {
      component.name = 'Robert';
      component.description = 'Description';
      expect(component.name).toBe('Robert');
      expect(component.description).toBe('Description');
      // spyOn(component.dialogRef, 'close');
      // component.onEdit();
      // expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });
});
