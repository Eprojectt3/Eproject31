import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public orderSubject: BehaviorSubject<Order[] | null>;

  constructor(private httpclient: HttpClient) {
    this.orderSubject = new BehaviorSubject<Order[] | null>(null);
  }

  getListOrders(): Observable<Order[]> {
    return this.httpclient.get<Order[]>(
      AUTH_API + '/api/Order/ListOrder',
      httpOptions
    );
  }

  // Get list Order pagination
  public getListOrdersPagination = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<Order[]> => {
    return this.httpclient
      .post<Order[]>(
        `${AUTH_API}/api/Order/ListOrderPagination`,
        {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
        httpOptions
      )
      .pipe(tap((val) => this.orderSubject.next(val)));
  };
}
