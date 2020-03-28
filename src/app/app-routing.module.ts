import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistrationComponent } from './pages/registration/registration.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { ProtectedComponent } from './pages/protected/protected.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
