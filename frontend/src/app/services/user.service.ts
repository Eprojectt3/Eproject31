import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL: string = 'https://localhost:7110/api/Users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getListUsers = (): Observable<any> => {
    return this.http.get(API_URL + 'GetListUsers', {
      responseType: 'text',
    });
  };
}
