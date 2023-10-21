import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Filter, filter } from 'src/app/models/filter.model';
import { Resort } from 'src/app/models/resort.model';

import { Tour } from 'src/app/models/tour';
import { PlaceService } from 'src/app/services/place.service';
import { ResortService } from 'src/app/services/resort.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-resorts-list',
  templateUrl: './resorts-list.component.html',
  styleUrls: ['./resorts-list.component.scss'],
})
export class ResortsListComponent implements OnInit {
  filters: Filter[] = filter;
  // tours:Tour[]=tours
  resorts!: any;
  selected = 'none';
  public pageSize: number = 12;
  public pageIndex: number = 0;

  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Resort>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: TitleService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Resorts List');
    this.getListResorts();
  }
  public getListResorts = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
      place_Type_ID: 2,
    };

    this.placeService.getListPlacePagination(data).subscribe((val: any) => {
      this.resorts = val.data;
      this.totalSize = val.count;
      this.dataSource = val.data;
    });
  };

  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;
    this.getListResorts();
  };
}
