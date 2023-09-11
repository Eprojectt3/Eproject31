import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'auth-token';
const RFTOKEN_KEY: string = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut = (): void => {
    localStorage.clear();
  };

  saveToken = (token: string): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

  getToken = (): any => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) as string);
  };

  saveUser = (user: unknown): void => {
    localStorage.removeItem(RFTOKEN_KEY);
    localStorage.setItem(RFTOKEN_KEY, JSON.stringify(user));
  };

  getUser = (): any => {
    return JSON.parse(localStorage.getItem(RFTOKEN_KEY) as string);
  };
}
