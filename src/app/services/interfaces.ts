
// https://transform.tools/json-to-typescript

export interface LatestJobs {
    apiVersion: string
    documentationUrl: string
    friendlyNotice: string
    jobCount: number
    xRayHash: string
    clientKey: string
    lastUpdate: string
    jobs: Job[]
  }
  
  export interface Job {
    id: number
    url: string
    jobSlug: string
    jobTitle: string
    companyName: string
    companyLogo: string
    jobIndustry: string[]
    jobType: string[]
    jobGeo: string
    jobLevel: string
    jobExcerpt: string
    jobDescription: string
    pubDate: string
    annualSalaryMin?: string
    annualSalaryMax?: string
    salaryCurrency?: string
  }
  