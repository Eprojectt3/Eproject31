import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transportation } from '../models/transportation.model';

const AUTH_API: string = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TransportationService {
  transportationSubject: BehaviorSubject<Transportation[] | null>;

  constructor(private httpClient: HttpClient) {
    this.transportationSubject = new BehaviorSubject<Transportation[] | null>(
      null
    );
  }

  // Get List Transportation
  public getListTransportation = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Transportation/ListTransportation',
      httpOptions
    );
  };

  // Get List Transportation Pagination
  public getListTransportationPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Transportation[]>(
        `${AUTH_API}/api/Transportation/ListTransportationPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.transportationSubject.next(val)));
  };

  // Get detail Transportation
  public getDetailTransportation = (id: number): Observable<any> => {
    return this.httpClient
      .get(
        `${AUTH_API}/api/Transportation/GetByTransportationId/${id}`,
        httpOptions
      )
      .pipe(tap((val: any) => this.transportationSubject.next(val)));
  };

  // Create Transportation
  public createTransportation = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Transportation/Add`, data);
  };

  // Delete Transportation
  public deleteTransportation = (id: number): Observable<any> => {
    return this.httpClient.delete(
      `${AUTH_API}/api/Transportation/Delete/${id}`
    );
  };

  // Update Transportation
  public updateTransportation = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Transportation/Update`, data);
  };
}
