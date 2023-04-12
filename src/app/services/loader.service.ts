import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { Observable, map } from "rxjs";
import { baseURL } from "../shared/baseurl";
import { HttpClient } from "@angular/common/http";

@Injectable({
 providedIn: 'root'
})
export class LeaderService {
  constructor(private http: HttpClient){}

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leadership => leadership[0]));
  }
}
