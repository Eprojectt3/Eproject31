import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../../../models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-feed',
  templateUrl: './detail-feed.component.html',
  styleUrls: ['./detail-feed.component.scss']
})
export class DetailFeedComponent  {
  // public feedback!: FeedBack;
  // public id!: number;

  // constructor(
  //   private feedbackService: FeedbackService,
  //   private route: ActivatedRoute,
  // ) {}

  // ngOnInit(): void {
  //   this.id = Number(this.route.snapshot.paramMap.get('id'));

  //   this.feedbackService.get(this.id).subscribe((val: any) => {
  //     this.hotel = val;
  //     console.log(this.hotel);
  //   });
  // }
}
