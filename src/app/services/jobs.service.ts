import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Location,
  LocationResults,
  Job,
  JobResults,
  JobSearch,
} from './interfaces';

const baseUrl = 'https://jobicy.com/api/v2';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  // inject HttpClient
  private http = inject(HttpClient);

  constructor() {}

  // getLatestJobs(): Observable<LatestJobs> {
  //   // returns a list of the most recent jobs
  //   return this.http.get<LatestJobs>(`${baseUrl}/remote-jobs`);
  // }
  // getJobDetails(id: number): Observable<Job> {
  //   return this.http.get<Job>(`${baseUrl}/remote-jobs/${id}`);
  // }
  getJobs(search: JobSearch = {}): Observable<Array<Job>> {
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const searchParams = new URLSearchParams();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(search)) {
      if (value) {
        // only provide valid values to API
        searchParams.set(key, value);
      }
    }
    const url = `${baseUrl}/remote-jobs?${searchParams.toString()}`;
    // returns a list of the most recent jobs
    return this.http.get<JobResults>(url).pipe(
      map((data) => {
        // store the jobs as string in the local storage
        localStorage.setItem('jobs', JSON.stringify(data.jobs));
        return data.jobs;
      })
    );
  }

  getJobDetails(id: number): Job | null {
    // get the jobs from the local storage
    const jobsItem = localStorage.getItem('jobs');
    if (jobsItem) {
      // parse the jobs from string to array of Job
      const jobs: Array<Job> = JSON.parse(jobsItem);
      return jobs.find((job) => job.id === id) || null;
    }
    return null;
  }

  saveJob(job: Job) {
    // get the saved jobs from the local storage
    const savedJobsItem = localStorage.getItem('savedJobs');
    let savedJobs: Array<Job> = [];
    if (savedJobsItem) {
      // parse the saved jobs from string to array of Job
      savedJobs = JSON.parse(savedJobsItem);
    }
    // add the job to the saved jobs
    savedJobs.push(job);
    // store the saved jobs as string in the local storage
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }

  // load savedJobs
  getSavedJobs(): Array<Job> {
    // get the saved jobs from the local storage
    const savedJobsItem = localStorage.getItem('savedJobs');
    let savedJobs: Array<Job> = [];
    if (savedJobsItem) {
      // parse the saved jobs from string to array of Job
      savedJobs = JSON.parse(savedJobsItem);
    }
    return savedJobs;
  }

  removeJob(job: Job) {
    // get the saved jobs from the local storage
    const savedJobsItem = localStorage.getItem('savedJobs');
    let savedJobs: Array<Job> = [];
    if (savedJobsItem) {
      // parse the saved jobs from string to array of Job
      savedJobs = JSON.parse(savedJobsItem);
      // remove the job from the saved jobs
      savedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
      // store the saved jobs as string in the local storage
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
  }

  getLocations(): Observable<Array<Location>> {
    return this.http
      .get<LocationResults>(`${baseUrl}/remote-jobs?get=locations`)
      .pipe(
        map((data) => {
          return data.locations;
        })
      );
  }
}
