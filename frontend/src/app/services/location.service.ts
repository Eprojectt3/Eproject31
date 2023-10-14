import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Hotel } from '../models/hotel';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationsSubject: BehaviorSubject<Location[] | null>;

  constructor(private http: HttpClient) {
    this.locationsSubject = new BehaviorSubject<Location[] | null>(null);
  }

  // Get list location
  public getListLocation = (): Observable<any> => {
    return this.http
      .get<Location>(
        `${environment.apiLocallHost}/api/Location/ListLocation1`,
        httpOptions,
      )
      .pipe(tap((val: any) => this.locationsSubject.next(val)));
  };

  // Get List Location Pagination
  public getListLocationPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.http
      .post<Location[]>(
        `${AUTH_API}/api/Location/ListLocation1Pagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.locationsSubject.next(val)));
  };

  // Create Location
  public createLocation = (data: any): Observable<any> => {
    return this.http.post(`${AUTH_API}/api/Location/Add`, data);
  };

  // Delete Location
  public deleteLocation = (id: number): Observable<any> => {
    return this.http.delete(`${AUTH_API}/api/Location/Delete/${id}`);
  };

  // Update Location
  public updateLocation = (data: any,id:number): Observable<any> => {
    return this.http.put(`${AUTH_API}/api/Location/Update/${id}`, data);
  };
}
