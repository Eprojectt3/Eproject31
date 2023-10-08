import { Component, OnInit } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';
import { Hotel } from '../../../../../models/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { MatCardLgImage } from '@angular/material/card';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit {
  filters: Filter[] = filter;
  // tours:Tour[]=tours
  hotels!: Hotel[];
  selected = 'none';

  constructor(
    private titleService: TitleService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotel List');
    this.hotelService.getListHotel().subscribe(
      (val: any) => {
        this.hotels = val;
        for (let hotel of this.hotels) {
          const firstPeriodIndex = hotel.description.indexOf('.');
          if (firstPeriodIndex !== -1) {
            hotel.description = hotel.description.slice(
              0,
              firstPeriodIndex + 1
            );
          }
        }
      },
      (error) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }
}
