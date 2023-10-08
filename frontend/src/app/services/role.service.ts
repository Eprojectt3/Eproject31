import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

const AUTH_API: string = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleSubject: BehaviorSubject<Role[] | null>;

  constructor(private httpClient: HttpClient) {
    this.roleSubject = new BehaviorSubject<Role[] | null>(null);
  }

  // Get List Role
  public getListRole = (): Observable<any> => {
    return this.httpClient.get(AUTH_API + '/api/Role/ListResorts', httpOptions);
  };

  // Get List Role Pagination
  public getListRolePagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<any> => {
    return this.httpClient
      .post<Role[]>(
        `${AUTH_API}/api/Role/ListRolesPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.roleSubject.next(val)));
  };

  // Get detail Role
  public getDetailRole = (id: number): Observable<any> => {
    return this.httpClient
      .get(`${AUTH_API}/api/Role/GetByRoleId/${id}`, httpOptions)
      .pipe(tap((val: any) => this.roleSubject.next(val)));
  };

  // Create Role
  public createRole = (data: any): Observable<any> => {
    return this.httpClient.post(`${AUTH_API}/api/Role/Add`, data);
  };

  // Delete Role
  public deleteRole = (id: number): Observable<any> => {
    return this.httpClient.delete(`${AUTH_API}/api/Role/Delete/${id}`);
  };

  // Update Role
  public updateRole = (data: any): Observable<any> => {
    return this.httpClient.put(`${AUTH_API}/api/Role/Update`, data);
  };
}