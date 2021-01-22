import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import {FeedComponent} from './components/feed/feed.component';
import {MatButtonToggle, MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {CdkTableModule} from '@angular/cdk/table';
import {UserListComponent} from './components/administration/user-list/user-list.component';
import { PostComponent } from './components/post/post/post.component';
import {UserManagamentComponent} from './components/administration/user-managament/user-managament.component';
import {MatTableModule} from '@angular/material/table';
import {CdkDetailRowDirective} from './cdk-detail-row.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatRippleModule} from '@angular/material/core';
import {SubredditComponent} from './components/subreddit/subreddit.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxFileDropModule} from 'ngx-file-drop';
import {MatSelectModule} from '@angular/material/select';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NgxEmojiPickerModule} from 'ngx-emoji-picker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FeedComponent,
    DeleteDialogComponent,
    UserListComponent,
    UserManagamentComponent,
    CdkDetailRowDirective,
    PostComponent,
    SubredditComponent,
    PostAddComponent,
    NavbarComponent,
    SubredditComponent
  ],
  imports: [
    NgxEmojiPickerModule,
    MatSnackBarModule,
    MatDialogModule,
    CdkTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatToolbarModule,
    ScrollingModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatMenuModule,
    HttpClientModule,
    PasswordStrengthMeterModule,
    InfiniteScrollModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatButtonToggleModule,
    NgxFileDropModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent, UserListComponent]
})
export class AppModule { }
