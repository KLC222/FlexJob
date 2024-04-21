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
  IonCol,
  IonGrid,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { JobsService } from '../services/jobs.service';
import { Job, Location, JobSearch, Industry } from '../services/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { addIcons } from 'ionicons';
import { globeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCol,
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
    IonGrid,
  ],
})
export class SearchPage {
  // Job service for API calls
  private jobsService = inject(JobsService);
  // Popover options
  locationPopoverOptions = {
    header: 'Location',
    subHeader: 'Select one location',
  };
  industryPopoverOptions = {
    header: 'Industry',
    subHeader: 'Select one industry',
  };
  // Lists of jobs, locations, and industries
  public jobs: Array<Job> = [];
  public locations: Array<Location> = [];
  public industries: Array<Industry> = [];
  // Inputs for search
  public selectedLocation = signal<string>('');
  public selectedIndustry = signal<string>('');
  public searchInput = signal<string>('');
  // make jobSearch a computed value of the searchInput, selectedLocation, and selectedIndustry
  public jobSearch = computed(() => {
    const search: JobSearch = {
      tag: this.searchInput(),
      geo: this.selectedLocation(),
      industry: this.selectedIndustry(),
    };
    return search;
  });
  // convert the signal to an observable so we can subscribe to it
  public jobSearch$ = toObservable(this.jobSearch);

  constructor(private router: Router) {
    addIcons({ globeOutline });

    // Load available locations and industries
    this.jobsService.getIndustries().subscribe({
      next: (industries) => {
        this.industries = industries;
      },
    });
    this.jobsService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
    });

    // update jobs list everytime the signal value changes
    this.jobSearch$
      .pipe(
        //switchMap to get the last value of the signal
        switchMap((search) => {
          console.log('search', search);
          return this.jobsService.getJobs(search);
        })
      )
      .subscribe({
        // handle the response
        next: (jobs) => {
          console.log('jobs results', jobs);
          // Update the jobs list
          this.jobs = jobs;
        },
        // handle the error
        error: (error) => {
          // this.isLoading = false;
          // this.error = error.status_message;
        },
      });
  }
}
