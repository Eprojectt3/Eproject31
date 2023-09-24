import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const AUTH_API:string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private httpclient:HttpClient) { }
  getListTour(){
   return this.httpclient.get(AUTH_API+"/api/Tour/ListTour")
  }
  // getTourDetail(){
  //   return this.httpclient.get("'https://localhost:7110/api/TourDetail/ListTourDetail")
  //  }
}
