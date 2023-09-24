import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { Tour } from 'src/app/models/tour';
import { ServiceService } from 'src/app/services/service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TourService } from 'src/app/services/tour.service';
import { CreateServiceComponent } from '../create-service/create-service.component';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {
  public services!: Service[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'name',
    'tour',
    'description',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Tour>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListServices();
      }
    });

    // Get list services pagination
    this.getListServices();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListServices();
  };

  // Get list services
  public getListServices = () => {
    this.serviceService
      .getListServicePagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.services = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
        console.log(this.dataSource);
      });
  };

  // Delete hotel
  public deleteService = (id: string): void => {
    this.serviceService.deleteService(id).subscribe(val=>{
      this.serviceService
      .getListServicePagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.services = val.data;
        this.totalSize = val.count;
      });
    })
  };
  // Create FeedBack
  public openCreateService = () => {
    const dialogRef = this.dialog.open(CreateServiceComponent, {
      height: '230px',
      width: '400px',
    });
  };

  public isShowCreateServices = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/services/create');
  };

  public isShowDetailServices = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/services/detail/');
  };

  public isUpdateServices = (): boolean => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/services/update/');
  };

}
