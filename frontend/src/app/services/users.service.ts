import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const AUTH_API: string = 'https://localhost:7110/api/Users/';
// const AUTH_API: string = 'http://localhost:5019/api/Users/';
// const AUTH_API: string = 'http://dapury.click/api/Users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // get all users
  public getAll = (): Observable<any> => {
    return this.http.get<User[]>(`${AUTH_API}GetListUsers`);
  };
}
