import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit {
  orders!: Order[];
  public pageEvent: PageEvent = new PageEvent();
  public totalSize: number = 0;
  public index: number = 1;
  public dataSource = new MatTableDataSource<any>([]);
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public displayedColumns: string[] = [
    'id',
    'price',
    'isactive',
    'number_of_people',
    'action',
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Get list orders
    this.getListOrder();
  }

  // HandlePage
  public handlePage = (e: any): any => {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.index = this.pageIndex + 1;

    this.getListOrder();
  };

  // Get list orders
  public getListOrder = () => {
    const data = {
      pageIndex: this.index,
      pageSize: this.pageSize,
    };

    this.orderService.getListOrdersPagination(data).subscribe((orders: any) => {
      this.orders = orders.data;
      this.totalSize = orders.count;
      this.dataSource = orders.data;
    });
  };

  public isShowDetailOrder = () => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/orders/detail/');
  };

  public isUpdateOrder = () => {
    const currentUrl: string = this.router.url;

    return currentUrl.includes('/admin/orders/update/');
  };

  public deleteOrder = (id: number) => {
    this.orderService.deleteOrder(id).subscribe(
      (val) => {
        this.snackBarService.openSnackBar('Delete success', 'Success');
        this.getListOrder();
      },
      (err) => {
        this.snackBarService.openSnackBar(err, 'Error');
        console.error(err);
      }
    );
  };
}
