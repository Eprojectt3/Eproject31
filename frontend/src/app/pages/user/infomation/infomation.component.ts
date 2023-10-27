import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { PlaceService } from 'src/app/services/place.service';
import { TitleService } from 'src/app/services/title.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss'],
})
export class InfomationComponent implements OnInit {
  tours: any;
  hotels: any;
  resorts: any;
  restaurants: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '2000px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1,
    },
  ];

  constructor(
    private titleService: TitleService,
    private tourService: TourService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Infomation');

    // get list tour
    this.tourService.getListTour().subscribe((val) => {
      this.tours = val.slice(0, 10);
    });

    // get list resorts
    this.placeService.getListPlace().subscribe((val) => {
      this.resorts = val.filter((item: any) => {
        return Number(item.placeTypeId) === 2;
      });

      this.resorts = this.resorts.slice(0, 10);
    });

    // get list restaurants
    this.placeService
      .getListPlacePagination({ pageIndex: 1, pageSize: 10, place_Type_ID: 3 })
      .subscribe((val) => {
        this.restaurants = val;
      });

    // get list hotels
    this.placeService
      .getListPlacePagination({ pageIndex: 1, pageSize: 10, place_Type_ID: 1 })
      .subscribe((val) => {
        this.hotels = val;
        console.log(this.hotels);
      });
  }
}
