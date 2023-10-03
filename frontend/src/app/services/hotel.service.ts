import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Hotel } from '../models/hotel';

const AUTH_API: string = environment.apiUrl;
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

  // Create hotel
  // public createHotel = (data: any): Observable<any> => {
  //   return this.httpClient.post(`${AUTH_API}/api/Hotel/Add`, data, httpOptions);
  // };
  public createHotel = (data: any): Observable<any> => {
    return this.httpClient.post(
      `${AUTH_API}/api/Hotel/Add`,
      {
        Name: data.get('Name'),
        Price_range: data.get('Price_range'),
        Description: data.get('Description'),
        Address: data.get('Address'),
        PhoneNumber: data.get('PhoneNumber'),
        fileCollection: data.get('fileCollection'),
      },
      httpOptions
    );
  };

  //  getHotelDetail(hotelId: number) {
  //   const apiUrl = 'https://localhost:7110/api/Hotel/GetByHotelId';

  //   const requestBody = { hotelId: hotelId };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //  // Make the POST request
  //   return this.httpClient.post(apiUrl, requestBody, { headers: headers });
  // }
}
