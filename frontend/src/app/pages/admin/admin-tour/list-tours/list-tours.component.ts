import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/models/tour';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-list-tours',
  templateUrl: './list-tours.component.html',
  styleUrls: ['./list-tours.component.scss'],
})
export class ListToursComponent implements OnInit {
  public tours!: Tour[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'quantity_limit',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Tour>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tourService: TourService,
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

    // Get list tours pagination
    this.getListTours();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListTours();
  };

  // Get list tours
  public getListTours = () => {
    this.tourService
      .getListToursPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.tours = val.data;

        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  // Delete tour
  public deleteTours = (id: number): void => {

    this.tourService.deleteTours(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListTours();
      },
      (err:any) => {
        this.snackBar.openSnackBar(err, 'Error');
        console.log(err);
      }
    );
  };

  public isShowCreateTour = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/tours/create');
  };

  public isShowDetailTour = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/tours/detail/');
  };

  public isUpdateTour = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/tours/update/');
  };
}
