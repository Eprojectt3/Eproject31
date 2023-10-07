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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute
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
    this.hotelService
      .getListHotelPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.hotels = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  // Delete hotel
  public deleteHotels = (id: number): void => {
    this.hotelService.deleteHotel(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListHotels();
      },
      (err) => {
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
