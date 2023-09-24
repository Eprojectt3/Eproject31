import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';

import { FeedBack } from '../../../../models/feedback.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Transportation } from 'src/app/models/transportation.model';
import { TransportationService } from 'src/app/services/transportation.service';
import { DialogCreateComponent } from '../../admin-category/dialog-create/dialog-create.component';
import { CreateTransportationComponent } from '../create-transportation/create-transportation.component';

@Component({
  templateUrl: './list-transportations.component.html',
  styleUrls: ['./list-transportations.component.scss'],
})
export class ListTransportationsComponent implements OnInit {

  public transportations!: Transportation[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = ['id', 'name', 'price','description', 'action'];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private transportationService: TransportationService,
    private dialog: MatDialog,
    private router :Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListTrans();
      }
    });

    // Get list hotel pagination
    this.getListTrans();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListTrans();
  };

  // Get list FeedBack
  public getListTrans = () => {
    this.transportationService
      .getListTransportationPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.transportations = val.data;
        console.log(this.transportations = val.data)
        this.totalSize = val.count;
      });
  };

  // Create FeedBack
  public openCreateTrans = () => {
    const dialogRef = this.dialog.open(CreateTransportationComponent, {
      height: '230px',
      width: '400px',
    });
  };

  public openUpdateTrans = (data:any) => {
    const dialogRef = this.dialog.open(CreateTransportationComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getListTrans();
        }
      }
    })
  };
  // Delete Feed

  public deleteTrans = (id:string) => {
    this.transportationService.deleteTransportation(id).subscribe(val=>{
      this.transportationService
      .getListTransportationPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.transportations = val.data;
        this.totalSize = val.count;

      });
    })
  }
  // public isUpdateCategory = (): boolean => {
  //   const currentUrl: string = this.router.url;

  //   return currentUrl.includes('/admin/categories/update/');
  // };

}
