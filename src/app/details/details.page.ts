import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JobsService } from '../services/jobs.service';
import { Job } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { save, caretBack, bookmark, bookmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DetailsPage {
  private jobsService = inject(JobsService);
  public job: WritableSignal<Job | null> = signal(null);
  public bookmarkIcon: string = 'bookmark-outline';

  @Input()
  set id(jobId: string) {
    const job = this.jobsService.getJobDetails(parseInt(jobId));
    this.job.set(job);
  }

  constructor() {
    addIcons({ save, caretBack, bookmark, bookmarkOutline });

    const job = this.job();
    if (job && this.jobsService.isSaved(job)) {
      this.bookmarkIcon = 'bookmark';
    }
  }

  // goBack() {
  //   this.routerOutlet.pop();
  // }

  saveJob(job: Job) {
    // add the job to the saved jobs
    this.jobsService.saveJob(job);
    this.bookmarkIcon = 'bookmark';
  }

  isSaved(job: Job): boolean {
    return this.jobsService.isSaved(job);
  }
}
