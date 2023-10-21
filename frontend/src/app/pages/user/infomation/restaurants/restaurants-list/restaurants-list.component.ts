import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Tour } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';
import { RestaurantService } from '../../../../../services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
})
export class RestaurantsListComponent implements OnInit {
  filters: Filter[] = filter;
  // tours:Tour[]=tours
  restaurants!: any[];
  selected = 'none';
  public pageSize: number = 12;
  public pageIndex: number = 0;

  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Restaurant>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: TitleService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotel List');
    this.getListRestaurants();
  }
  public getListRestaurants = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
      place_Type_ID: 3,
    };

    this.placeService.getListPlacePagination(data).subscribe((val: any) => {
      this.restaurants = val.data;
      console.log(this.restaurants);
      this.totalSize = val.count;
      this.dataSource = val.data;
    });
  };

  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;
    this.getListRestaurants();
  };
}
