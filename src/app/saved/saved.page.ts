import { Component, inject, signal, WritableSignal } from '@angular/core';
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
import { EventType, Router, RouterModule } from '@angular/router';
import { Job } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { globeOutline } from 'ionicons/icons';
import { filter } from 'rxjs';

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
  // signal to update the UI with the list of saved jobs
  public saved: WritableSignal<Array<Job> | null> = signal(null);

  constructor(private router: Router) {
    addIcons({ globeOutline });

    // Update the list of saved jobs when the user navigates to this tab
    // https://angular.io/guide/router-reference#router-events
    router.events
      .pipe(
        // Only return event when navigation ends on this tab
        filter((event) => {
          return (
            // go to any page
            event.type === EventType.NavigationEnd &&
            // check if it's the saved tab
            event.url === '/tabs/saved'
          );
        })
      )
      .subscribe((event) => {
        this.getSavedJobs();
      });
  }

  // Get the list of saved jobs
  getSavedJobs() {
    // get the list of saved jobs from the service
    this.jobsService.getSavedJobs().then((savedJobs) => {
      // update the signal with the list of saved jobs
      this.savedJobs = savedJobs;
    });
  }
}
