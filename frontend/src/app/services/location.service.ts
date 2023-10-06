import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Hotel } from '../models/hotel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationsSubject: BehaviorSubject<Location[] | null>;

  constructor(private http: HttpClient) {
    this.locationsSubject = new BehaviorSubject<Location[] | null>(null);
  }

  // Get list location
  public getListLocation = (): Observable<any> => {
    return this.http
      .get<Location>(
        `${environment.apiUrl}/api/Location/ListLocation1`,
        httpOptions,
      )
      .pipe(tap((val: any) => this.locationsSubject.next(val)));
  };

  // Get list location pagination
}
