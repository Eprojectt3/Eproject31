import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Filter, filter } from 'src/app/models/filter.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { PlaceService } from 'src/app/services/place.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-search-result-restaurant',
  templateUrl: './search-result-restaurant.component.html',
  styleUrls: ['./search-result-restaurant.component.scss'],
})
export class SearchResultRestaurantComponent implements OnInit {
  hotels!: Restaurant[];
  filters: Filter[] = filter;
  selected = 'none';
  public pageSize: number = 12;
  public pageIndex: number = 0;
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  queryData!: any;
  public dataSource = new MatTableDataSource<Restaurant>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tourService: TourService,
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourService.tourSearchSubject.subscribe((val: any) => {
      this.hotels = val.data;
      this.totalSize = val.count;
      this.dataSource = val.data;
      console.log(val);
    });

    // this.getListHotels();
  }

  public getListHotels = () => {
    const data: any = {
      pageIndex: this.index,
      pageSize: this.pageSize,
      place_Type_ID: 3,
    };

    this.route.queryParamMap.subscribe((params) => {
      console.log(params.get('location'));
      if (params.get('location')) {
        data.location = params.get('location');
      }
      if (params.get('rating')) {
        data.rating = params.get('rating');
      }
      if (params.get('name')) {
        data.search = params.get('name');
      }
    });

    this.tourService.searchPlace(data).subscribe((val: any) => {
      this.hotels = val.data;
      this.totalSize = val.count;
      this.dataSource = val.data;
    });
  };

  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;
    this.getListHotels();
  };
}
