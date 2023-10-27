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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // tap((event) => {
      //   if (event instanceof HttpResponse) {
      //     // Check the status code and navigate to login if it's 401
      //     if (event.status === 401) {
      //       this.tokenStorage.signOut();
      //     }
      //   }
      // }),
      catchError((err) => {
        if (
          [401, 400].includes(err.status) &&
          this.tokenStorage.getUser() !== null
        ) {
          // this.tokenStorage.signOut();
          this.authService.logout();
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        console.log(err);
        return throwError(() => error);
      })
    );
  }
}
