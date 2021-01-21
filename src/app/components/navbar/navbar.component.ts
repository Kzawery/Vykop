import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  constructor(fb: FormBuilder, private ngZone: NgZone,    private router: Router,
              public authenticationService: AuthenticationService, private userService: UserService, private postService: PostService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue.role);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  manage() {
    this.router.navigate(['/users']);
  }


}
