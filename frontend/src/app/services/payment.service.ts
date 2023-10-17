import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API: string = environment.apiLocallHost;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  // Payment by VNPay
  public getPayment = (data: any): Observable<any> => {
    return this.http.post<any>(`${AUTH_API}/api/PaymentVnPay/GetPayment`, data);
  };

  public createData = (data: any): Observable<any> => {
    return this.http.post<any>(`${AUTH_API}/api/PaymentVnPay/CreateData`, data);
  };

  // Payment by Paypal
  public createOrder = (data: any): Observable<any> => {
    return this.http.post<any>(
      `${AUTH_API}/api/PaymentPayPal/CreateOrder`,
      data
    );
  };

  public capturePayment1 = (data: any): Observable<any> => {
    return this.http.post<any>(
      `${AUTH_API}/api/PaymentPayPal/CapturePayment1`,
      data
    );
  };
}
