import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Resort } from '../models/resort';

const AUTH_API: string = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ResortService {
  resortSubject: BehaviorSubject<Resort[] | null>;

  constructor(private httpClient: HttpClient) {
    this.resortSubject = new BehaviorSubject<Resort[] | null>(null);
  }

  // Get List Resort
  public getListResort = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Resort/ListResorts',
      httpOptions
    );
  };

  // Get List Resort Pagination
  public getListResortPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Resort[]>(
        `${AUTH_API}/api/Resort/ListResortsPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.resortSubject.next(val)));
  };

  // Get detail Resort
  public getDetailResort = (id: number): Observable<any> => {
    return this.httpClient
      .get(`${AUTH_API}/api/Resort/GetByResortId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.resortSubject.next(val)));
  };

  // Create Resort
  public createResort = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Resort/Add`, data);
  };

  // Delete Resort
  public deleteResort = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Resort/Delete/${id}`);
  };

  // Update Resort
  public updateResort = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Resort/Update`, data);
  };
}
