import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AUTH_API: string = environment.apiLocallHost;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // Get List Category
  public getCategories = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<Category[]> => {
    return this.http.post<Category[]>(
      `${AUTH_API}/api/Category/ListCategoryPagination`,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      httpOptions
    );
  };

  // Create category
  public createCategory = (name: string | undefined): Observable<any> => {
    return this.http.post(
      `${AUTH_API}/api/Category/Add`,
      {
        name: name,
      },
      httpOptions
    );
  };
}
