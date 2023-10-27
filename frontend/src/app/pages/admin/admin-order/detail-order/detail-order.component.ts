import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail.model';
import { Order } from 'src/app/models/order.model';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {
  public order!: Order;
  public id!: number;
  public orderDetail!: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService.getDetailOrder(this.id).subscribe((order: Order) => {
      this.order = order;

      this.orderDetailService
        .getListOrderDetail()
        .subscribe((val: OrderDetail[]) => {
          this.orderDetail = val.filter((item: OrderDetail) => {
            return item.orderID === order.id;
          });
        });
    });
  }
}
