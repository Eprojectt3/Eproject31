import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { TitleService } from 'src/app/services/title.service';
import { Hotel } from '../../../../../models/hotel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit {
  filters: Filter[] = filter;
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
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotel List');
    this.getListHotels();
  }
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

  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;
    this.getListHotels();
  };
}
