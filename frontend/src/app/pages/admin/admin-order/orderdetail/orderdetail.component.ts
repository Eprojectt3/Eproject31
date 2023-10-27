import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail.model';
import { OrderDetailService } from 'src/app/services/order-detail.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
})
export class OrderdetailComponent implements OnInit {
  public id!: number;
  public orderDetail!: any;

  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.orderDetailService
      .getListOrderDetail()
      .subscribe((val: OrderDetail[]) => {
        this.orderDetail = val.filter((item: OrderDetail) => {
          return item.id === this.id;
        });

        console.log(this.orderDetail);
      });
  }
}
