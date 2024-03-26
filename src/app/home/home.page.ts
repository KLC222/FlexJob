import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonList,
  IonImg,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonBadge,
  IonButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Job } from '../services/interfaces';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonLabel,
    IonItem,
    IonImg,
    IonList,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    ExploreContainerComponent,
    IonButton,
    RouterModule,
  ],
})
export class HomePage {
  // inject JobsService
  private jobsService = inject(JobsService);
  private error = null;
  private isLoading = false;
  public jobs: Array<Job> = [];

  constructor(private router: Router) {
    this.loadLatestJobs();
  }

  loadLatestJobs() {
    // set isLoading to true
    this.isLoading = true;

    this.jobsService.getLatestJobs().subscribe({
      // handle the response
      next: (jobs) => {
        this.isLoading = false;
        this.jobs = jobs;
      },
      // handle the error
      error: (error) => {
        this.isLoading = false;
        this.error = error.status_message;
      },
    });
  }
}
