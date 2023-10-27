import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import {Observable, catchError, throwError, tap, map} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // Check the status code and navigate to login if it's 401
          if (event.status === 401) {
            this.tokenStorage.signOut();
          }
        }
      }),
      catchError((err) => {
        console.log(err.status)
        if (
          [400].includes(err.status)
        ) {

          this.tokenStorage.signOut();
          // if(this.tokenStorage.getUser()){
          //   this.tokenStorage.signOut();
          // }
          // localStorage.clear();
          // this.router.navigate(['/auth/login'])
          // this.authService.logout();
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        console.log(err);
        return throwError(() => error);
      })
    );
  }
}
