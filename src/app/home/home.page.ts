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
import {
  globeOutline,
  bookmarkOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

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
  // Creating the list of jobs
  public jobs: Array<Job> = [];

  constructor(private router: Router) {
    // call to immediately load the latest jobs
    this.loadLatestJobs();
    addIcons({ globeOutline, bookmarkOutline, chevronForwardOutline });
    // Set the status bar to dark
    StatusBar.setStyle({ style: Style.Dark });
  }

  // Load the latest jobs
  loadLatestJobs() {
    // subscribe to the jobs service
    this.jobsService.getJobs().subscribe({
      // handle the response
      next: (jobs) => {
        this.jobs = jobs;
      },
      // handle the error
      error: (error) => {
        console.log(error);
      },
    });
  }
}
