import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staff } from '../models/staff.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  staffsSubject: BehaviorSubject<Staff[] | null>;

  constructor(private httpClient: HttpClient) {
    this.staffsSubject = new BehaviorSubject<Staff[] | null>(null);
  }

  getListStaff() {
    return this.httpClient.get<any>(AUTH_API + '/api/Staff/ListStaff');
  }

  // Get list staffs pagination
  public getListStaffPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<Staff[]> => {
    return this.httpClient
      .post<Staff[]>(
        `${AUTH_API}/api/Staff/ListStaffPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.staffsSubject.next(val)));
  };

  // Get detail staff
  public getDetailStaff = (id: number): Observable<any> => {
    return this.httpClient
      .get(`${AUTH_API}/api/Staff/GetByStaffId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.staffsSubject.next(val)));
  };

  // Create staff
  public createStaff = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Staff/Add`, data);
  };

  // Delete staff
  public deleteStaff = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Staff/Delete/${id}`);
  };

  // Update staff
  public updateStaff = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Staff/Update`, data);
  };
}
