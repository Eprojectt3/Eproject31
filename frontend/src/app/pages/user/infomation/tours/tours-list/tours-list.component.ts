import { Tour } from 'src/app/models/tour';
import { Component, OnInit } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { TitleService } from 'src/app/services/title.service';
import { TourService } from '../../../../../services/tour.service';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss'],
})
export class ToursListComponent implements OnInit {
  filters: Filter[] = filter;

  tours!: Tour[] ;

  constructor(
    private titleService: TitleService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tours list');
    this.tourService.getListTour().subscribe((val:any) => {
      this.tours=val;
    });
  }
}
