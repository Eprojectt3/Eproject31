import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurantSubject: BehaviorSubject<Restaurant[] | null>;

  constructor(private httpClient: HttpClient) {
    this.restaurantSubject = new BehaviorSubject<Restaurant[] | null>(null);
  }

  // Get List Restaurant
  public GetListRestaurant = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Restaurant/ListRestaurant',
      httpOptions
    );
  };

  // Get List Restaurant Pagination
  public getListRestaurantPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Restaurant[]>(
        `${AUTH_API}/api/Restaurant/ListRestaurantPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.restaurantSubject.next(val)));
  };

  // Get detail Restaurant
  public getDetailRestaurant = (id: number): Observable<any> => {
    return this.httpClient
      .get(`${AUTH_API}/api/Restaurant/GetByRestaurantId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.restaurantSubject.next(val)));
  };

  // Create Restaurant
  public createRestaurant = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Restaurant/Add`, data);
  };

  // Delete Restaurant
  public deleteRestaurant = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Restaurant/Delete/${id}`);
  };

  // Update Restaurant
  public updateRestaurant = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Restaurant/Update`, data);
  };
}
