// https://transform.tools/json-to-typescript

export interface LocationResults {
  locations: Location[];
}

export interface Location {
  geoID: number;
  geoName: string;
  geoSlug: string;
}

export interface JobSearch {
  geo?: string;
  industry?: string;
  tag?: string;
}

export interface JobResults {
  apiVersion: string;
  documentationUrl: string;
  friendlyNotice: string;
  jobCount: number;
  xRayHash: string;
  clientKey: string;
  lastUpdate: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  url: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  annualSalaryMin?: string;
  annualSalaryMax?: string;
  salaryCurrency?: string;
}
