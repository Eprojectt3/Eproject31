import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API: string = environment.apiLocallHost;

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
    return this.http.get<User[]>(`${AUTH_API}/api/Users/GetListUsers`);
  };
}
