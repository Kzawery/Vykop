import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubVykopComponent } from './add-sub-vykop.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

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
          useValue: {}
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
});
