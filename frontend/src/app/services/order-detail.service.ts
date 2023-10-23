import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetail } from '../models/order-detail.model';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  orderDetailSubject = new BehaviorSubject<OrderDetail | null>(null);

  constructor(private http: HttpClient) { }

  // Get list order detail
  public getListOrderDetail = (): Observable<OrderDetail[]> => {
    return this.http
      .get<OrderDetail[]>(
        `${AUTH_API}/api/OrderDetail/ListOrderDetailWithTour`,
        httpOptions,
      )
      .pipe(
        tap((val: any) => {
          this.orderDetailSubject.next(val);
        }),
      );
  };
}
