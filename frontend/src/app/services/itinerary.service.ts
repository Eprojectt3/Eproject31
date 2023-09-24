import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itinerary } from '../models/itinerary.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  itinerarySubject: BehaviorSubject<Itinerary[] | null>;

  constructor(private httpClient: HttpClient) {
    this.itinerarySubject = new BehaviorSubject<Itinerary[] | null>(null);
  }

  // Get List Itinerary
  public getListItinerary = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Itinerary/ListItinerary',
      httpOptions
    );
  };

  // Get List Itinerary Pagination
  public getListItineraryPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Itinerary[]>(
        `${AUTH_API}/api/Itinerary/ListItineraryPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.itinerarySubject.next(val)));
  };

  // Create Itinerary
  public createItinerary = (tour_Name: string | undefined , sequence:number | undefined, description:string |undefined
    ,type:string|undefined): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Itinerary/Add`, {
      tour_Name: tour_Name,
      sequence:sequence,
      description:description,
      type:type
    }, httpOptions);
  };

  // Delete Itinerary
  public deleteItinerary = (id: string): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Itinerary/Delete/${id}`);
  };

  // Update Itinerary
  public updateItinerary = (data: any , id: number): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Itinerary/Update/${id}`, data);
  };
}
