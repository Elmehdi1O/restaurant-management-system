import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Feedback } from "../shared/feedback";
import { Observable } from "rxjs";
import { baseURL } from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }
  submitFeedback(data: Feedback): Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Feedback>( baseURL + 'feedback', data, httpOptions);
  }

}
