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
import {
  save,
  caretBack,
  bookmark,
  bookmarkOutline,
  openOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Toast } from '@capacitor/toast';
import { Share } from '@capacitor/share';

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

  // get the job details based on the job ID passed from the router
  @Input()
  set id(jobId: string) {
    this.jobsService.getJobDetails(parseInt(jobId)).then((job) => {
      // set the job to the signal
      this.job.set(job);
      if (job) {
        // check if the job is saved
        this.jobsService.isSaved(job).then((isSaved) => {
          // set the bookmark icon based on the saved status
          this.bookmarkIcon = isSaved ? 'bookmark' : 'bookmark-outline';
        });
      }
    });
  }

  constructor() {
    addIcons({
      save,
      caretBack,
      bookmark,
      bookmarkOutline,
      openOutline,
      shareSocialOutline,
    });
  }

  // save or remove the job from the saved list when the bookmark icon is clicked
  async saveJob(job: Job) {
    // check if the job is already saved
    const isSaved = await this.jobsService.isSaved(job);
    if (isSaved) {
      // remove the job from the saved list
      await this.jobsService.removeJob(job);
      // set the bookmark icon to outline
      this.bookmarkIcon = 'bookmark-outline';
    } else {
      // add the job to the saved list
      await this.jobsService.saveJob(job);
      // set the bookmark icon to filled
      this.bookmarkIcon = 'bookmark';
      // show a toast message
      await Toast.show({ text: 'Job saved!' });
    }
  }

  // open the job URL in the browser
  async openBrowser() {
    // get the job URL
    const job_url = this.job()?.url;
    if (job_url) {
      // open the job URL in the browser
      await Browser.open({ url: job_url });
    }
  }

  // Share the job URL
  async shareJob() {
    // get the job URL
    const job_url = this.job()?.url;
    if (job_url) {
      // share the job URL
      await Share.share({
        title: 'Check out this job!',
        text: 'I found this job and thought you might be interested!',
        url: job_url,
      });
    }
  }
}
