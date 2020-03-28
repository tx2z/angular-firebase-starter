import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

import { RegistrationComponent } from './pages/registration/registration.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { ProtectedComponent } from './pages/protected/protected.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    VerifyEmailComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AngularFirestoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
