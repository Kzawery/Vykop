import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from './services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: Router,
          useValue: {}
        }
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'Vykop'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Vykop');
  // }));
 // it('should render title in a h1 tag', async(() => {
 //    const fixture = TestBed.createComponent(AppComponent);
 //    fixture.detectChanges();
 //    const compiled = fixture.debugElement.nativeElement;
 //    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
 //  }));
});
