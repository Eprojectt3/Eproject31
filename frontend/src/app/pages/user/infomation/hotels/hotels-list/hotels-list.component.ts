import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Tour, tours } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';
import { Hotel } from '../../../../../models/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { MatCardLgImage } from '@angular/material/card';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  public pageSize: number = 12;
  public pageIndex: number = 0;

  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Hotel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: TitleService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotel List');
    this.getListHotels();

  }
  public getListHotels = () => {
    this.hotelService
      .getListHotelPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.hotels = val.data;
        console.log( this.hotels);
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
