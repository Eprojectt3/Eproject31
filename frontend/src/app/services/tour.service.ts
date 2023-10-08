import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Tour } from '../models/tour';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const AUTH_API: string = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TourService {
  public toursSubject: BehaviorSubject<Tour[] | null>;

  constructor(private httpclient: HttpClient) {
    this.toursSubject = new BehaviorSubject<Tour[] | null>(null);
  }

  getListTour() {
    return this.httpclient.get(AUTH_API + '/api/Tour/ListTour');
  }

  // Get list tour pagination
  public getListToursPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<Tour[]> => {
    return this.httpclient
      .post<Tour[]>(
        `${AUTH_API}/api/Tour/ListTourPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.toursSubject.next(val)));
  };

  // Create tours
  public createTours = (data: any): Observable<any> => {
    return this.httpclient.post(`${AUTH_API}/api/Tour/Add`, data);
  };

  // getTourDetail(){
  //   return this.httpclient.get("'https://localhost:7110/api/TourDetail/ListTourDetail")
  //  }
}
