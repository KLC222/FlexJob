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
  IonIcon,
  IonGrid,
  IonCol,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { globeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonIcon,
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
    IonCol,
  ],
})
export class SavedPage {
  private jobsService = inject(JobsService);
  savedJobs: Array<Job> = [];

  constructor(private router: Router) {
    let savedJobs = this.jobsService.getSavedJobs();
    this.savedJobs = savedJobs;
    console.log(savedJobs);
    addIcons({ globeOutline });
  }
}
