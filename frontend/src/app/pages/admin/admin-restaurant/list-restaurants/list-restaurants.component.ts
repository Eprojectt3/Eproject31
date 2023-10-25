import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Restaurant } from 'src/app/models/restaurant.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit {
  public restaurants!: Restaurant[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'location',
    'phone',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Restaurant>([]);
  public data = {

    place_Type_ID: 2,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListRestaurants();
      }
    });

    // Get list Restaurant pagination
    this.getListRestaurants();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListRestaurants();
  };

  // Get list Restaurant
  public getListRestaurants = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
      place_Type_ID: 3,
    };
    this.placeService
      .getListPlacePagination(data)
      .subscribe((val: any) => {
        this.restaurants = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };


  // Delete hotel
  public deleteRestaurant = (id: number): void => {
    this.placeService.DeletePlace(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListRestaurants();
      },
      (err) => {
        this.snackBar.openSnackBar(err, 'Error');
        console.log(err);
      }
    );
  };

  public isShowCreateRestaurants = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/restaurants/create');
  };

  public isShowDetailRestaurants = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/restaurants/detail/');
  };

  public isUpdateRestaurants = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/restaurants/update/');
  };

}
