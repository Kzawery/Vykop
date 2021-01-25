import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubVykopComponent } from './add-sub-vykop.component';

describe('AddSubVykopComponent', () => {
  let component: AddSubVykopComponent;
  let fixture: ComponentFixture<AddSubVykopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubVykopComponent ]
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
