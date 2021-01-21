import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './helpers/auth.guard';
import {UserListComponent} from './components/administration/user-list/user-list.component';
import {Role} from './models/role';
import {PostComponent} from './components/post/post/post.component';
import {SubredditComponent} from './components/subreddit/subreddit.component';
import {FeedComponent} from './components/feed/feed.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]}},
  { path: 'post', component: PostComponent },
  { path: 'subVykop/:id', component: SubredditComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'post/:id', component: PostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
