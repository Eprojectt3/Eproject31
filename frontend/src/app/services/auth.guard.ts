import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { SnackbarService } from './snackbar.service';
import { RoleService } from './role.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private snackBar: SnackbarService,
    private roleService: RoleService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const user = this.tokenStorage.getUser();
    const role: number | undefined = user?.roleId;
    let isRoleSuccess: any = [];
    let roleAdmin: any = [];
    let flag: boolean;

    return this.roleService.getListRole().pipe(
      map((roles) => {
        if (user) {
          roleAdmin = roles.filter((role: any) => {
            return role.id === user?.roleId;
          });

          if (roleAdmin.length > 0) {
            for (let item of roleAdmin) {
              if (!route.data['roles'].includes(item.name)) {
                this.tokenStorage.signOut();
                this.snackBar.openSnackBar(
                  'You do not have access to the admin page',
                  'Error',
                );
                this.router.navigate(['/auth/login']);
                return false;
              } else {
                return true;
              }
            }
          }
        }
        this.router.navigate(['/auth/login']);
        return false;
      }),
    );
  }
}
