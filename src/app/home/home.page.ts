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
  IonCard,
  IonIcon,
  IonGrid,
  IonCol,
  IonFab,
  IonFabButton,
  IonRow,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Job } from '../services/interfaces';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { globeOutline, bookmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonFabButton,
    IonFab,
    IonCol,
    IonGrid,
    IonIcon,
    IonCard,
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
    addIcons({ globeOutline, bookmarkOutline });
  }

  loadLatestJobs() {
    // set isLoading to true
    this.isLoading = true;

    this.jobsService.getJobs({ tag: 'php' }).subscribe({
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
