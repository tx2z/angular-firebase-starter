# ANGULAR FIREBASE

## Create angular APP

``` bash
npm install -g @angular/cli
ng new angular-firebase-starter
```

## Set Up Firebase Authentication & Firestone

TODO: Create account

## Install angular fire

``` bash
npm install --save firebase @angular/fire
```

src/environments/environment.ts

``` typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

src/app/app.module.ts

``` typescript
...

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

...

imports: [
    ...
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
],
providers: [
    ...
    AngularFirestoreModule,
],

...
```

## Add services

``` bash
ng g class models/user.model
```

``` typescript
export class User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}
```

``` bash
ng g service services/auth
```

src/app/services/auth.service.ts

``` typescript
Add file content
```

``` bash
ng g service services/authGuard
```

src/app/services/auth-guard.service.ts

``` typescript
Add file content
```

Add them to src/app/app.module.ts

``` typescript
...

import { AuthService } from 'src/app/services/auth.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

...

providers: [
    ...
    AuthService,
    AuthGuardService,
],

...
```

## Add pages

### Register

``` bash
ng generate component pages/registration
```

src/app/pages/registration/registration.component.ts

``` typescript
Add file content
```

src/app/pages/registration/registration.component.html

``` html
Add file content
```

Add it to routes file src/app/app-routing.module.ts

``` typescript
...

import { RegistrationComponent } from './pages/registration/registration.component';

...

const routes: Routes = [
    ...
    { path: 'register', component: RegistrationComponent },
    ...
];

...
```

### Verify email

``` bash
ng generate component pages/verify-email
```

src/app/pages/verify-email/verify-email.component.ts

``` typescript
Add file content
```

src/app/pages/verify-email/verify-email.component.html

``` html
Add file content
```

Add it to routes file src/app/app-routing.module.ts

``` typescript
...

import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

...

const routes: Routes = [
    ...
    { path: 'verify-email', component: VerifyEmailComponent },
    ...
];

...
```

### Login

``` bash
ng generate component pages/login
```

src/app/pages/login/login.component.ts

``` typescript
Add file content
```

src/app/pages/login/login.component.html

``` html
Add file content
```

Add it to routes file src/app/app-routing.module.ts

``` typescript
...

import { LoginComponent } from './pages/login/login.component';

...

const routes: Routes = [
    ...
    { path: 'login', component: LoginComponent },
    ...
];

...
```

## Use it

``` typescript
...

import { AuthService } from 'src/app/services/auth.service';

...
export class AppComponent {

...

    constructor(
        ...
        private authService: AuthService,
        ...
    ) {}

...

    logOut() {
        return this.authService.SignOut();
    }

...
}
```

### Protected pages

``` bash
ng generate component pages/protected
```

src/app/pages/protected/protected.component.ts

``` typescript
Add file content
```

src/app/pages/protected/protected.component.html

``` html
Add file content
```

Add it to routes file src/app/app-routing.module.ts

``` typescript
...

import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ProtectedComponent } from './pages/protected/protected.component';

...

const routes: Routes = [
    ...
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuardService] },
    ...
];

...
```
