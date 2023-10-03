import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HotelService } from '../../../../services/hotel.service';
import { Router } from '@angular/router';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private hotelService: HotelService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getListHotels();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListHotels();
  };

  // Get list Category
  public getListHotels = () => {
    this.hotelService
      .getListHotelPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.hotels = val.data;
        this.totalSize = val.count;
      });
  };

  public isShowListHotel = (): boolean => {
    const currentUrl = this.router.url;

    return currentUrl.includes('/admin/hotels/create');
  };
}
