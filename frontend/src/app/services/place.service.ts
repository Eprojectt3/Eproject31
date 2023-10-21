import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    );
  };
}
