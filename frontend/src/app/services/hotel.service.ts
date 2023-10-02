import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const AUTH_API:string = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClient : HttpClient) {

   }

   getListHotel(){

      return this.httpClient.get( AUTH_API+"/api/Hotel/ListHotel")
   }




  //  getHotelDetail(hotelId: number) {
  //   const apiUrl = 'https://localhost:7110/api/Hotel/GetByHotelId';


  //   const requestBody = { hotelId: hotelId };


  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //  // Make the POST request
  //   return this.httpClient.post(apiUrl, requestBody, { headers: headers });
  // }

}
