import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';

import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant.model';

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
    'price_range',
    'location',
    'phoneNumber',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Hotel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListTours();
      }
    });

    // Get list hotel pagination
    this.getListTours();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListTours();
  };

  // Get list Hotel
  public getListTours = () => {
    this.restaurantService
      .getListRestaurantPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.restaurants = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };


  // Delete hotel
  public deleteRestaurant = (id: number): void => {
    this.restaurantService.deleteRestaurant(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListTours();
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
