import { Tour } from 'src/app/models/tour';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { TitleService } from 'src/app/services/title.service';
import { TourService } from '../../../../../services/tour.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss'],
})
export class ToursListComponent implements OnInit {
  filters: Filter[] = filter;
  public pageSize: number = 12;
  public pageIndex: number = 0;
  tours!: any[];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private titleService: TitleService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tours list');
    this.getListTours();
  }

  public getListTours = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
    };

    this.tourService
      .getListToursPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.tours = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;
    this.getListTours();
  };
}
