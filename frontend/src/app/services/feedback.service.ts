import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedBack } from '../models/feedback.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AUTH_API: string = environment.apiLocallHost;
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbacksSubject!: BehaviorSubject<FeedBack[] | null>;

  constructor(private http: HttpClient) { }

  public getFeedBacks = (
    pageIndex?: number,
    pageSize: number = 10
  ): Observable<FeedBack[]> => {
    return this.http.post<FeedBack[]>(
      `${AUTH_API}/api/FeedBack/ListFeedBackPagination`,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      httpOptions
    );
  };



    // Create feedback
    public createFeedback = (name: string | undefined , title:string | undefined, email:string |undefined
      ,phone:string|undefined): Observable<any> => {
      return this.http.post(
        `${AUTH_API}/api/FeedBack/Add`,
        {
          name: name,
          title:title,
          email:email,
          phone:phone
        },
        httpOptions
      );
    };

    // delete feedback
    public deleteFeedback = (id:string | undefined):Observable<FeedBack>=>{
      return this.http.delete<FeedBack>(`${AUTH_API}/api/FeedBack/Delete/`+id)
    }
    // Update feddback
  public updateFeedback = (data: any): Observable<any> => {
    return this.http.put(`${AUTH_API}/api/FeedBack/Update`, data);
  };
}
