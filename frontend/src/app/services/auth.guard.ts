import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (user) {
      return true;
    } else {
      const dialogConfigsLogin = {
        disableClose: true,
        closeOnNavigation: true,
        width: '450px',
        height: '420px',
      };

      return false;
    }
  }
}
