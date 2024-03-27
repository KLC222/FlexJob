import { Component, inject, signal, computed } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonThumbnail,
  IonBadge,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Job, Location, JobSearch } from '../services/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonSearchbar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonList,
    IonItem,
    IonThumbnail,
    IonBadge,
    RouterModule,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class SearchPage {
  private jobsService = inject(JobsService);
  public jobs: Array<Job> = [];
  public locations: Array<Location> = [];
  public selectedLocation = signal<string>('');
  public searchInput = signal<string>('');
  public jobSearch = computed(() => {
    const search: JobSearch = {
      tag: this.searchInput(),
      geo: this.selectedLocation(),
    };
    return search;
  });
  public jobSearch$ = toObservable(this.jobSearch);

  constructor(private router: Router) {
    this.jobsService.getLocations().subscribe({
      // handle the response
      next: (locations) => {
        this.locations = locations;
      },
      // handle the error
      error: (error) => {
        // this.isLoading = false;
        // this.error = error.status_message;
      },
    });
    console.log(this.selectedLocation);
    // called everytime the signal value (selected location) changes

    this.jobSearch$
      .pipe(
        switchMap((search) => {
          console.log('search', search);
          return this.jobsService.getJobs(search);
        })
      )
      .subscribe({
        // handle the response
        next: (jobs) => {
          console.log('jobs results', jobs);
          this.jobs = jobs;
        },
        // handle the error
        error: (error) => {
          // this.isLoading = false;
          // this.error = error.status_message;
        },
      });
  }

  handleInput(event: any) {
    const tag = event.target.value.toLowerCase();
    this.jobsService.getJobs({ tag: tag }).subscribe({
      // handle the response
      next: (jobs) => {
        // this.isLoading = false;
        this.jobs = jobs;
      },
      // handle the error
      error: (error) => {
        // this.isLoading = false;
        // this.error = error.status_message;
      },
    });
  }

  customPopoverOptions = {
    header: 'Location',
    subHeader: 'Select location',
  };
}
