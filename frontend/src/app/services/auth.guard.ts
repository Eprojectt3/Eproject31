import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { Location } from '@angular/common';
import { TokenStorageService } from './token-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackBar: SnackbarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.tokenStorage.getUser();
    const role: number | undefined = user?.roleId;

    if (user) {
      if (route.data['roles'].indexOf(1) !== -1) {
        if (route.data['roles'].indexOf(role) === -1) {
          this.tokenStorage.signOut();
          this.snackBar.openSnackBar(
            'You do not have access to the admin page',
            'Error'
          );

          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      }

      if (
        (route.data['roles'].indexOf(2) !== -1 &&
          route.data['roles'].indexOf(1) !== -1) ||
        route.data['roles'].indexOf(2) !== -1
      ) {
        return true;
      }
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
