import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LatestJobs } from './interfaces';
import { Job } from './interfaces';

const baseUrl = 'https://jobicy.com/api/v2';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // inject HttpClient
  private http = inject(HttpClient);

  constructor() { }

  getLatestJobs(): Observable<LatestJobs> {
    // returns a list of the most recent jobs
    return this.http.get<LatestJobs>(`${baseUrl}/remote-jobs`);
  }

  getJobDetails(id: number): Observable<Job> {
    return this.http.get<Job>(`${baseUrl}/remote-jobs/${id}`)
  }

}
