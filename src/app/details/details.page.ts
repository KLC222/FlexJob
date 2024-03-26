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
import { save, caretBack } from 'ionicons/icons';

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

  @Input()
  set id(jobId: string) {
    const job = this.jobsService.getJobDetails(parseInt(jobId));
    console.log(job);
    this.job.set(job);
  }

  constructor() {
    addIcons({ save, caretBack });
  }

  // goBack() {
  //   this.routerOutlet.pop();
  // }
}
