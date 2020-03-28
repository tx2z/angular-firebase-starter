import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase-starter';
  user = this.authService.user;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goToLogin() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.authService.SignOut();
  }

}

