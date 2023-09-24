import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  serviceSubject: BehaviorSubject<Service[] | null>;

  constructor(private httpClient: HttpClient) {
    this.serviceSubject = new BehaviorSubject<Service[] | null>(null);
  }

  // Get List Service
  public getListService = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Service/ListService',
      httpOptions
    );
  };

  // Get List Service Pagination
  public getListServicePagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Service[]>(
        `${AUTH_API}/api/Service/ListServicePagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.serviceSubject.next(val)));
  };

  // Create Service
  public createService = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Service/Add`, data);
  };

  // Delete Service
  public deleteResort = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Service/Delete/${id}`);
  };

  // Update Service
  public updateResort = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Service/Update`, data);
  };
}
