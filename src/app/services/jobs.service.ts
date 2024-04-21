import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';
import { StorageService } from './storage.service';
import {
  Location,
  LocationResults,
  Job,
  JobResults,
  JobSearch,
  IndustryResults,
  Industry,
} from './interfaces';

const baseUrl = 'https://jobicy.com/api/v2';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  // inject HttpClient
  private http = inject(HttpClient);

  constructor(private storage: StorageService) {}

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
      // use mergeMap to return the list of jobs instead of the promise
      mergeMap(async (data) => {
        // store the jobs in the local storage
        await this.saveJobsList(data.jobs);
        return data.jobs;
      })
    );
  }

  // Save new jobs without erasing the existing ones
  async saveJobsList(jobs: Array<Job>) {
    // store the jobs in the local storage
    const existingJobs = await this.storage.get('jobs');
    // merge the existing jobs with the new jobs
    if (existingJobs) {
      // copy jobs to a new array
      const allJobs = [...jobs];
      for (const job of existingJobs) {
        // check if the job is already in the list
        if (!allJobs.some((existingJob) => existingJob.id === job.id)) {
          // add the job to the list
          allJobs.push(job);
        }
      }
      await this.storage.set('jobs', allJobs);
    } else {
      // if there are no existing jobs, store the new jobs
      await this.storage.set('jobs', jobs);
    }
  }

  // get the details of a job
  async getJobDetails(id: number): Promise<Job | null> {
    // get the jobs from the local storage
    const jobs: Array<Job> = await this.storage.get('jobs');
    if (jobs) {
      // return the job with the matching job id
      const job = jobs.find((job) => job.id === id) || null;
      return job;
    }
    return null;
  }

  // load savedJobs
  async getSavedJobs(): Promise<Array<Job>> {
    // get the saved jobs from the local storage
    const savedJobs = await this.storage.get('savedJobs');
    //return saved jobs or empty array
    return savedJobs ?? [];
  }

  // check if a job is saved
  async isSaved(job: Job): Promise<boolean> {
    // get the saved jobs from the local storage
    const savedJobs = await this.getSavedJobs();
    // check if the job is in the saved jobs, test if at least one element in the array passes the test
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    return savedJobs.some((savedJob) => savedJob.id === job.id);
  }

  // save a job to the saved jobs
  async saveJob(job: Job) {
    // get the saved jobs from the local storage
    const savedJobs = await this.getSavedJobs();
    // add the job to the saved jobs
    savedJobs.push(job);
    // store the saved jobs in the local storage
    await this.storage.set('savedJobs', savedJobs);
  }

  // remove a job from the saved jobs
  async removeJob(job: Job) {
    // get the saved jobs from the local storage
    let savedJobs = await this.getSavedJobs();
    // filter to remove the job from the saved jobs and return a new list
    savedJobs = savedJobs.filter((savedJob) => savedJob.id !== job.id);
    // store the saved jobs in the local storage
    await this.storage.set('savedJobs', savedJobs);
  }

  // get the list of locations
  getLocations(): Observable<Array<Location>> {
    return this.http
      .get<LocationResults>(`${baseUrl}/remote-jobs?get=locations`)
      .pipe(
        map((data) => {
          return data.locations;
        })
      );
  }

  // get the list of industries
  getIndustries(): Observable<Array<Industry>> {
    return this.http
      .get<IndustryResults>(`${baseUrl}/remote-jobs?get=industries`)
      .pipe(
        map((data) => {
          // Apply the transformation to each industry object
          return data.industries.map((industry) => {
            return {
              // to include all the properties of the industry object https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
              ...industry,
              // Replace HTML entities with their actual characters
              industryName: industry.industryName.replace('&amp;', '&'),
            };
          });
        })
      );
  }
}
