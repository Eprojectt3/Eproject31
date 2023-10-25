import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail.model';
import { Order } from 'src/app/models/order.model';
import { TourDetail } from 'src/app/models/tour-detail.model';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TourDetailService } from 'src/app/services/tour-detail.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  orderDetails: any[] = [];
  user!: any;
  tourDetails: any;
  order: any;
  // keyValuePairs: { [key: Object]: OrderDetail } = {};
  orderAndTourMap: Map<any, any> = new Map<any, any>();

  constructor(
    private orderDetailService: OrderDetailService,
    private tokenStorage: TokenStorageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get list order detail
    this.orderDetailService
      .getListOrderDetail()
      .subscribe((orderDetails: OrderDetail[]) => {
        this.orderDetails = orderDetails;

        this.user = this.tokenStorage.getUser();

        this.orderDetails = this.orderDetails.filter(
          (orderDetail: OrderDetail) => {
            return orderDetail.user_ID === this.user.id;
          }
        );

        this.orderService.getListOrders().subscribe((order: Order[]) => {
          order.forEach((val: Order) => {
            const orderDetail = this.orderDetails.find((item) => {
              return item.orderID === val.id;
            });

            if (orderDetail) {
              this.orderAndTourMap.set(orderDetail, val);
            }
          });
        });
      });
  }

  // Is show order detail
  public isShowOrderDetail = (): boolean => {
    const currentUrl = this.router.url;
    return currentUrl.includes('/order-detail/');
  };
}
