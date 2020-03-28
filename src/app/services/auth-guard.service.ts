import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService} from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['login'], {
              queryParams: {
                return: state.url
              }
            });
            return false;
          }
        })
    );
  }

}
