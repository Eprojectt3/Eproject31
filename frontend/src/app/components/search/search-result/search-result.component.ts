import { Component, OnInit } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  filters: Filter[] = filter;
  data: any;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.tourSearchSubject.subscribe((val: any) => {
      this.data = val;
    });
  }
}
