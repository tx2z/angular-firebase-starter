import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(
    private authService: AuthService,
  ) { }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value);
  }

}
