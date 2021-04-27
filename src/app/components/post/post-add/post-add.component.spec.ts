import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { PostAddComponent } from './post-add.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

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
});
