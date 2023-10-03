import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const AUTH_API:string = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ResortService {

  constructor(private httpClient:HttpClient) { }

  getListResort(){
    return this.httpClient.get(AUTH_API+"/api/Resort/ListResorts");
  }
  // getResortDetail(resortId: number) {
  //   const apiUrl = 'https://localhost:7110/api/Resort/GetByResortId';

  //   // Prepare the request body with the hotelId
  //   const requestBody = { resortId:resortId };

  //   // Set the appropriate headers if needed
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   // Make the POST request
  //   return this.httpClient.post(apiUrl, requestBody, { headers: headers });
  // }
}
