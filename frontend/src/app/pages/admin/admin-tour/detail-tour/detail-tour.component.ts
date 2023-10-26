import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../../models/tour';
import { TourService } from 'src/app/services/tour.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-tour',
  templateUrl: './detail-tour.component.html',
  styleUrls: ['./detail-tour.component.scss']
})

export class DetailTourComponent implements OnInit {
  public tours!: Tour;
  public id!: number;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this. tourService.getDetailTour(this.id).subscribe((val: any) => {
      this.tours = val;
    });
  }

}
