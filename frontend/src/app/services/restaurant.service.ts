import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const AUTH_API:string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient:HttpClient) { }
  GetListRestaurant(){
   return this.httpClient.get(AUTH_API+"/api/Restaurant/ListRestaurant")
  }


}
