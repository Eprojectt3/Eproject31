import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../../../models/hotel';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../../services/location.service';
import { Location } from '@angular/common';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-staffs',
  templateUrl: './list-staffs.component.html',
  styleUrls: ['./list-staffs.component.scss'],
})
export class ListStaffsComponent implements OnInit {
  public staffs!: Staff[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'personId',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Staff>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private staffService: StaffService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListStaffs();
      }
    });

    // Get list hotel pagination
    this.getListStaffs();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListStaffs();
  };

  // Get list Hotel
  public getListStaffs = () => {
    this.staffService
      .getListStaffPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.staffs = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  // Delete hotel
  public deleteStaffs = (id: number): void => {
    this.staffService.deleteStaff(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListStaffs();
      },
      (err) => {
        this.snackBar.openSnackBar(err, 'Error');
        console.log(err);
      }
    );
  };

  public isShowCreateStaff = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/staffs/create');
  };

  public isShowDetailStaff = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/staffs/detail/');
  };

  public isUpdateStaff = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/staffs/update/');
  };
}
