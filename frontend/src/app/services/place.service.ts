import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Place } from '../models/place.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  public placeSubject: BehaviorSubject<Place[] | null>;


  constructor(private httpclient: HttpClient) {
    this.placeSubject = new BehaviorSubject<Place[] | null>(null);
  }

  // Get List Place
  public getListPlace = (): Observable<any> => {
    return this.httpclient.get(`${AUTH_API}/api/Place/ListHotel`, httpOptions);
  };

 // Create hotel
 public createPlace = (data: any): Observable<any> => {
  return this.httpclient.post(`${AUTH_API}/api/Place/Add`, data);
};
  public DeletePlace = (id:number):Observable<any>=>{
    return this.httpclient.delete(`${AUTH_API}/api/Place/Delete/${id}`)
  }
  // Update Place
  public updatePlace = (data: any): Observable<any> => {
    return this.httpclient.put(`${AUTH_API}/api/Place/Update`, data);
  };

  // Get List Place
  public getListPlacePagination = (data: any): Observable<any> => {
    return this.httpclient.post(
      `${AUTH_API}/api/Place/ListHotelPagination`,
      data,
      httpOptions
    );
  };

  // Get list place type
  public getListPlaceType = (): Observable<any> => {
    return this.httpclient.get(`${AUTH_API}/api/PlaceType`, httpOptions);
  };

  // Get place by id
  public getPlaceById = (id: number): Observable<any> => {
    return this.httpclient.get(
      `${AUTH_API}/api/Place/GetByHotelId/${id}`,
      httpOptions
    ).pipe(
      tap((resData:any) => {
        this.placeSubject.next(resData);
      })
    );
  };
}
