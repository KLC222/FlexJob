import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { JobsService } from '../services/jobs.service';
import { Job } from '../services/interfaces';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  // inject JobsService
  private jobsService = inject(JobsService);
  private error = null;
  private isLoading = false;
  private jobs: Array<Job> = [];

  constructor() {
    addIcons({ triangle, ellipse, square });
    this.loadLatestJobs();
  }

  loadLatestJobs() {
    // set isLoading to true
    this.isLoading = true;

    this.jobsService.getLatestJobs().subscribe({
      // handle the response
      next: (res) => {
        this.isLoading = false;
        this.jobs = res.jobs;
      },
      // handle the error
      error: (error) => {
        this.isLoading = false;
        this.error = error.status_message;
      },
    });
  }
}
