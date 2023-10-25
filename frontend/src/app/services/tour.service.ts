import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Tour } from '../models/tour';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Tour_10 } from '../models/top10-tour.model';

const AUTH_API: string = environment.apiLocallHost;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TourService {
  public toursSubject: BehaviorSubject<Tour[] | null>;
  public tour_10Subject: BehaviorSubject<Tour_10[] | null>;

  public toursDetailSubject: BehaviorSubject<Tour | null>;
  public $tourDetail: Observable<Tour | null>;
  public tourSearchSubject: BehaviorSubject<Tour[] | null> =
    new BehaviorSubject<Tour[] | null>(null);

  constructor(private httpclient: HttpClient) {
    this.toursSubject = new BehaviorSubject<Tour[] | null>(null);
    this.tour_10Subject = new BehaviorSubject<Tour_10[] | null>(null);
    this.toursDetailSubject = new BehaviorSubject<Tour | null>(null);
    this.$tourDetail = this.toursDetailSubject.asObservable();
  }

  getListTour(): Observable<Tour[]> {
    return this.httpclient.get<Tour[]>(
      AUTH_API + '/api/Tour/ListTour',
      httpOptions,
    );
  }

  public getTop10Tour = (): Observable<Tour_10[]> => {
    return this.httpclient
      .get<Tour_10[]>(`${AUTH_API}/api/Tour/Get_Top_10_Tour`, httpOptions)
      .pipe(tap((val) => this.tour_10Subject.next(val)));
  };

  // Get list tour pagination
  public getListToursPagination = (
    pageIndex?: number,
    pageSize: number = 10,
  ): Observable<Tour[]> => {
    return this.httpclient
      .post<Tour[]>(
        `${AUTH_API}/api/Tour/ListTourPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions,
      )
      .pipe(tap((val) => this.toursSubject.next(val)));
  };

  // Get detail tour
  public getDetailTour = (id: number): Observable<any> => {
    return this.httpclient
      .get(`${AUTH_API}/api/Tour/GetByTourId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.toursSubject.next(val)));
  };

  // Create tours
  public createTours = (data: any): Observable<any> => {
    return this.httpclient.post(`${AUTH_API}/api/Tour/Add`, data);
  };

  // Delete Tour
  public deleteTours = (id: string): Observable<any> => {
    return this.httpclient.delete(`${AUTH_API}/api/Tour/Delete/${id}`);
  };

  // Create tour
  public createTour = (data: any): Observable<any> => {
    return this.httpclient.post(`${AUTH_API}/api/Tour/Add`, data);
  };

  // Delete Tour
  public deleteTour = (id: number): Observable<any> => {
    return this.httpclient.delete(`${AUTH_API}/api/Tour/Delete/${id}`);
  };

  // Update Tour
  public updateTour = (data: any): Observable<any> => {
    return this.httpclient.put(`${AUTH_API}/api/Tour/Update`, data);
  };

  // Update rating
  public updateRating = (data: any): Observable<any> => {
    return this.httpclient.put(`${AUTH_API}/api/Tour/UpdateRating`, data);
  };

  // Search Tour
  public searchTour = (data: any): Observable<any> => {
    return this.httpclient
      .post(`${AUTH_API}/api/TourDetail/SearchTour`, data)
      .pipe(tap((val: any) => this.tourSearchSubject.next(val)));
  };

  public searchPlace = (data: any): Observable<any> => {
    return this.httpclient
      .post(`${AUTH_API}/api/Place/ListHotelPagination`, data)
      .pipe(tap((val: any) => this.tourSearchSubject.next(val)));
  };
}
