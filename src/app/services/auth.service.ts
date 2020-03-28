import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const urls = {
  home: '',
  verify: 'verify-email'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<any>;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private firebaseStorage: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
  ) {
    // Get auth data, then get firestore user document || null
    this.user = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebaseStorage.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Login in with email/password
  async SignIn(email: string, password: string, url: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified) {
          this.SetUserData(result.user);
          this.router.navigateByUrl(url);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch(error => this.handleError(error));
  }

  // Register user with email/password
  async RegisterUser(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.SendVerificationMail();
      }).catch(error => this.handleError(error));
  }

  // Email verification when new user register
  async SendVerificationMail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([urls.verify]);
      }).catch(error => this.handleError(error));
  }

  // Recover password
  async PasswordRecover(passwordResetEmail: string) {
    return this.firebaseAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch(error => this.handleError(error));
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  async AuthLogin(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate([urls.home]);
        });
        this.SetUserData(result.user);
      }).catch(error => this.handleError(error));
  }

  // Store user is store and firebase
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firebaseStorage.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || '',
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  async SignOut() {
    return this.firebaseAuth.auth.signOut()
    .then(() => {
      this.router.navigate([urls.home]);
    }).catch((error) => {
      window.alert(error.message || error);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    window.alert(error.message || error);
  }

}
