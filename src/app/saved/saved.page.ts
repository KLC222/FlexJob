import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButton,
  IonBadge,
  IonThumbnail,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../services/interfaces';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonBadge,
    IonThumbnail,
    IonItem,
    IonLabel,
    RouterModule,
  ],
})
export class SavedPage {
  private jobsService = inject(JobsService);
  savedJobs: Array<Job> = [];

  constructor(private router: Router) {
    let savedJobs = this.jobsService.getSavedJobs();
    this.savedJobs = savedJobs;
    console.log(savedJobs);
  }
}
