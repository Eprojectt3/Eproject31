import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TourDetail } from '../models/tour-detail.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TourDetailService {
  public tourdetailSubject: BehaviorSubject<TourDetail[] | null>;
  public tourDetailDetailSubject: BehaviorSubject<TourDetail | null>;
  public $tourDetailDetail: Observable<TourDetail | null>;

  constructor(private httpclient: HttpClient) {
    this.tourdetailSubject = new BehaviorSubject<TourDetail[] | null>(null);
    this.tourDetailDetailSubject = new BehaviorSubject<TourDetail | null>(null);
    this.$tourDetailDetail = this.tourDetailDetailSubject.asObservable();
  }

  getListTourDetail(): Observable<TourDetail[]> {
    return this.httpclient.get<TourDetail[]>(
      AUTH_API + '/api/TourDetail/ListTourDetail',
      httpOptions
    );
  }

  // Get list tour detail pagination
  public getListTourDetailsPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<TourDetail[]> => {
    return this.httpclient
      .post<TourDetail[]>(
        `${AUTH_API}/api/TourDetail/ListTourDetailPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.tourdetailSubject.next(val)));
  };

  // Create TourDetail
  public createTourDetail = (data: any): Observable<any> => {
    return this.httpclient.post(`${AUTH_API}/api/TourDetail/Add`, data);
  };

  // Delete TourDetail
  public deleteTourDetail = (id: number): Observable<any> => {
    return this.httpclient.delete(`${AUTH_API}/api/TourDetail/Delete/${id}`);
  };

  // Update TourDetail
  public updateTourDetail = (data: any): Observable<any> => {
    return this.httpclient.put(`${AUTH_API}/api/TourDetail/Update`, data);
  };
}
