import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Filter, filter } from 'src/app/models/filter.model';
import { Resort } from 'src/app/models/resort.model';

import { Tour } from 'src/app/models/tour';
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
  resorts!: Resort[];
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
    private resortService: ResortService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotel List');
    this.getListResorts();

  }
  public getListResorts = () => {
    this.resortService
      .getListResortPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.resorts = val.data;
        console.log( this.resorts);
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
