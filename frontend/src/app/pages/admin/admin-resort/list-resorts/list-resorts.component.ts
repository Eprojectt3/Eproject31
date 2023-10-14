import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Resort } from 'src/app/models/resort.model';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-list-resorts',
  templateUrl: './list-resorts.component.html',
  styleUrls: ['./list-resorts.component.scss']
})
export class ListResortsComponent implements OnInit {

  public resort!: Resort[];
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
    private resortService: ResortService,
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
    this.resortService
      .getListResortPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.resort = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  // Delete hotel
  public deleteResort = (id: string): void => {
    this.resortService.deleteResort(id).subscribe(
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

  public isShowCreateHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/resorts/create');
  };

  public isShowDetailHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/resorts/detail/');
  };

  public isUpdateHotel = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/resorts/update/');
  };

}
