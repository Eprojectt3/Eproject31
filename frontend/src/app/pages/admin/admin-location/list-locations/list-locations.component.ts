import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { CategoryService } from 'src/app/services/category.service';


import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from 'src/app/services/location.service';
import { DialogCreateComponent } from '../../admin-category/dialog-create/dialog-create.component';
import { CreateLocationComponent } from '../create-location/create-location.component';

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.scss']
})
export class ListLocationsComponent implements OnInit {
  public locations!: Location[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = ['id', 'state', 'action'];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<Location>([]);


  constructor(
    private locationService: LocationService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListLocations();
      }
    });

    // Get list hotel pagination
    this.getListLocations();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListLocations();
  };

  // Get list Location
  public getListLocations = () => {
    this.locationService
      .getListLocationPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.locations = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
      });
  };

  // Create cate
  public openCreateLocation = () => {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
      height: '230px',
      width: '400px',
    });
  };

  public deleteLocation = (id:number) => {
    this.locationService.deleteLocation(id).subscribe(val=>{
      this.locationService
      .getListLocationPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.locations = val.data;
        this.totalSize = val.count;
      });
    })
  }


  public openUpdateLocation = (data:any) => {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getListLocations();
        }
      }
    })
  };

}
