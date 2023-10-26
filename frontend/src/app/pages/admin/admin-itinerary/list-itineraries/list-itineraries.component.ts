import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Itinerary } from 'src/app/models/itinerary.model';
import { Service } from 'src/app/models/service.model';
import { Tour } from 'src/app/models/tour';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CreateItinerariesComponent } from '../create-itineraries/create-itineraries.component';

@Component({
  selector: 'app-list-itineraries',
  templateUrl: './list-itineraries.component.html',
  styleUrls: ['./list-itineraries.component.scss'],
})
export class ListItinerariesComponent {
  public itineraries!: Itinerary[];
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'tour_Name',
    'sequence',

    'description',
    'type',
    'action',
  ];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<Itinerary>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itinerarieservice: ItineraryService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.refresh === 'true') {
        this.getListitineraries();
      }
    });

    // Get list itineraries pagination
    this.getListitineraries();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListitineraries();
  };

  // Get list itineraries
  public getListitineraries = () => {
    this.itinerarieservice
      .getListItineraryPagination(this.index, this.pageSize)
      .subscribe((val: any) => {
        this.itineraries = val.data;
        this.totalSize = val.count;
        this.dataSource = val.data;
        console.log(this.dataSource);
      });
  };

  // Delete hotel
  public deleteItineraries = (id: string): void => {
    this.itinerarieservice.deleteItinerary(id).subscribe(
      (val: any) => {
        this.snackBar.openSnackBar('Delete success', 'Success');
        this.getListitineraries();
      },
      (err: any) => {
        this.snackBar.openSnackBar(err, 'Error');
        console.log(err);
      }
    );
  };
  // Create FeedBack
  public openCreateItinerary = () => {
    const dialogRef = this.dialog.open(CreateItinerariesComponent, {
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListitineraries();
        }
      },
    });
  };
  // update
  public openUpdateItinerary = (data: any) => {
    const dialogRef = this.dialog.open(CreateItinerariesComponent, {
      data: data,
      height: '230px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListitineraries();
        }
      },
    });
  };

  // public isShowCreateitineraries = (): boolean => {
  //   const currentUrl: string = this.router.url;

  //   return currentUrl.includes('/admin/itineraries/create');
  // };

  // public isShowDetailitineraries = (): boolean => {
  //   const currentUrl: string = this.router.url;

  //   return currentUrl.includes('/admin/itineraries/detail/');
  // };

  // public isUpdateitineraries = (): boolean => {
  //   const currentUrl: string = this.router.url;

  //   return currentUrl.includes('/admin/itineraries/update/');
  // };
}
