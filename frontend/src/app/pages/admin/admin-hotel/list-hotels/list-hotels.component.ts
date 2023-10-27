import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HotelService } from '../../../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../../services/location.service';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss'],
})
export class ListHotelsComponent implements OnInit {
  public hotels!: Hotel[];
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
  public dataSource = new MatTableDataSource<Hotel>([]);
  public data = {
    place_Type_ID: 1,
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
        this.getListHotels();
      }
    });

    // Get list hotel pagination
    this.getListHotels();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListHotels();
  };

  // Get list Hotel
  public getListHotels = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
      place_Type_ID: 1,
    };
    this.placeService.getListPlacePagination(data).subscribe((val: any) => {
      this.hotels = val.data;
      this.totalSize = val.count;
      this.dataSource = val.data;
    });
  };

  // Delete hotel
  public deleteHotels = (id: number): void => {
    this.placeService.DeletePlace(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListHotels();
      },
      (err: any) => {
        this.snackBar.openSnackBar(err, 'Error');
        console.log(err);
      }
    );
  };

  public isShowCreateHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/hotels/create');
  };

  public isShowDetailHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/hotels/detail/');
  };

  public isUpdateHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/hotels/update/');
  };
}
