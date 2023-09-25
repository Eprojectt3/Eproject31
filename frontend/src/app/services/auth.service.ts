import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/user.model';

// const AUTH_API: string = 'https://localhost:7276/api/Users/';
const AUTH_API: string = 'http://localhost:5272/api/Users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private refreshTokenTimeout?: NodeJS.Timeout;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
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
          username: user?.username,
          password: user?.password,
        },
        httpOptions
      )
      .pipe(
        map((data: any) => {
          this.userSubject.next(data?.userInfo);
          // this.startRefreshTokenTimer();

          return data;
        }),
        catchError((err: any) => {
          return of(err);
        })
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
        httpOptions
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  };

  // Refresh token
  refreshToken = (): Observable<any> => {
    const token: any = this.tokenStorage.getToken();
    console.log(token);

    return this.http
      .post<any>(AUTH_API + 'Refresh', {
        refreshToken: token?.refreshToken,
        accessToken: token?.accessToken,
      })
      .pipe(
        map((data) => {
          this.tokenStorage.saveToken(data);

          return data;
        }),
        tap(() => this.startRefreshTokenTimer())
      );
  };

  // Timer to auto refresh token and stop refresh token
  public startRefreshTokenTimer = () => {
    const token: any = this.tokenStorage.getToken();

    const decodeToken = JSON.parse(atob(token?.accessToken.split('.')[1]));

    const expires = new Date(decodeToken?.exp * 1000);

    const timeout: number = expires.getTime() - Date.now() - 60 * 1000;

    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  };

  private stopRefreshTokenTimer = () => {
    clearTimeout(this.refreshTokenTimeout);
  };
}
