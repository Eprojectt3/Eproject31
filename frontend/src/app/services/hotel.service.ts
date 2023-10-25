import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Hotel } from '../models/hotel';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  hotelsSubject: BehaviorSubject<Hotel[] | null>;

  constructor(private httpClient: HttpClient) {
    this.hotelsSubject = new BehaviorSubject<Hotel[] | null>(null);
  }

  getListHotel() {
    return this.httpClient.get(AUTH_API + '/api/Hotel/ListHotel');
  }

  // Get list hotels pagination
  public getListHotelPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<Hotel[]> => {
    return this.httpClient
      .post<Hotel[]>(
        `${AUTH_API}/api/Hotel/ListHotelPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.hotelsSubject.next(val)));
  };

  // Get detail hotel
  public getDetailHotel = (id: number): Observable<any> => {
    return this.httpClient
      .get(`${AUTH_API}/api/Place/GetByHotelId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.hotelsSubject.next(val)));
  };

  // Create hotel
  public createHotel = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Place/Add`, data);
  };

  // Delete hotel
  public deleteHotel = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Place/Delete/${id}`);
  };

  // Update hotel
  public updateHotel = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Place/Update`, data);
  };
}
