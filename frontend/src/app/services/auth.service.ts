import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { SnackbarService } from './snackbar.service';

// const AUTH_API: string = 'https://localhost:7110/api/Users/';
// const AUTH_API: string = 'http://localhost:5019/api/Users/';
const AUTH_API: string = 'http://dapury.click/api/Users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject!: BehaviorSubject<User | null>;
  public $user!: Observable<User | null>;
  private refreshTokenTimeout?: NodeJS.Timeout;
  public $isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private snackBarService: SnackbarService,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.$user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // Login
  Login = (user: User): Observable<any> => {
    return this.http
      .post(
        AUTH_API + 'Login',
        {
          username: user?.userInfo?.username,
          password: user?.userInfo?.password,
        },
        httpOptions,
      )

      .pipe(
        map((data: any) => {
          this.userSubject.next(data);
          this.$isLoggedInSubject.next(true);
          this.snackBarService.openSnackBar('Login successfully');

          return data;
        }),
        catchError((err: any) => {
          this.snackBarService.openSnackBar(err, 'Error');

          return of(err);
        }),
      );
  };

  // Logout
  logout = () => {
    const token: any = this.tokenStorage.getToken();

    this.http
      .post(
        `${AUTH_API}Logout`,
        {
          accessToken: token?.accessToken,
          refreshToken: token?.refreshToken,
        },
        httpOptions,
      )
      .pipe(
        tap(() => {
          this.$isLoggedInSubject.next(false);
        }),
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  };

  // Refresh token
  refreshToken = (): Observable<any> => {
    const token: any = this.tokenStorage.getToken();

    return this.http
      .post<any>(AUTH_API + 'Refresh', {
        refreshToken: token?.refreshToken,
        accessToken: token?.accessToken,
      })
      .pipe(
        map((data: any) => {
          this.tokenStorage.saveToken(data);
          this.$isLoggedInSubject.next(true);

          return data;
        }),
        tap(() => this.startRefreshTokenTimer()),
      );
  };

  // Timer to auto refresh token and stop refresh token
  public startRefreshTokenTimer = () => {
    const token = this.tokenStorage.getToken();

    if (token) {
      const decodeToken = JSON.parse(atob(token?.accessToken.split('.')[1]));

      const expires = new Date(decodeToken?.exp * 1000);

      const timeout: number = expires.getTime() - Date.now() - 60 * 1000;

      this.refreshTokenTimeout = setTimeout(
        () => this.refreshToken().subscribe(),
        timeout,
      );
    }
  };

  private stopRefreshTokenTimer = () => {
    clearTimeout(this.refreshTokenTimeout);
    this.tokenStorage.signOut();
  };
}