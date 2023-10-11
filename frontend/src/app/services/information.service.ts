import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Information } from '../models/information.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  informationSubject: BehaviorSubject<Information[] | null>;

  constructor(private httpClient: HttpClient) {
    this.informationSubject = new BehaviorSubject<Information[] | null>(null);
  }

  // Get List Information
  public getListInformation = (): Observable<any> => {
    return this.httpClient.get(
      AUTH_API + '/api/Information/ListInformation',
      httpOptions
    );
  };

  // Get List Information Pagination
  public getListInformationPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Information[]>(
        `${AUTH_API}/api/Information/ListInformationPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.informationSubject.next(val)));
  };

  // Create Information
  public createInformation = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Information/Add`, data);
  };

  // Delete Information
  public deleteInformation = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Information/Delete/${id}`);
  };

  // Update Information
  public updateInformation = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Information/Update`, data);
  };
}
