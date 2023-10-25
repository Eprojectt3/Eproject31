import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models/order-detail.model';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderDetail: OrderDetail | undefined;
  id!: number;
  user!: any;
  range_time: number = 1;
  departureDate!: Date;
  endDate!: Date;
  createAt!: Date;
  rating: number = 0;
  formData: FormData = new FormData();

  constructor(
    private orderDetailService: OrderDetailService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    // Get id from url
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Get list order detail
    this.orderDetailService
      .getListOrderDetail()
      .subscribe((orderDetails: OrderDetail[]) => {
        this.orderDetail = orderDetails.find((item: OrderDetail) => {
          return item?.id === this.id;
        });

        this.range_time = Number(this.orderDetail?.range_time);
        this.departureDate = new Date(
          this.orderDetail?.tourDetail?.start_Date as Date
        );
        this.endDate = new Date(this.orderDetail?.tourDetail?.end_Date as Date);
        this.createAt = new Date(
          this.orderDetail?.tourDetail?.createDate as Date
        );

        console.log(this.orderDetail);

        // Get tour detail
        this.tourService
          .getDetailTour(this.orderDetail?.tourDetail?.tourId as number)
          .subscribe((val) => {
            this.rating = val.rating;
          });
      });

    // Get user
    this.user = this.tokenStorageService.getUser();
  }

  // On rate
  onRate = (e: any) => {
    const data = { id: this.id, rating: this.rating };

    this.formData.append('id', String(this.orderDetail?.tourDetail?.tourId));
    this.formData.append('rating', String(this.rating));

    this.tourService.updateRating(this.formData).subscribe(
      (val) => {
        this.rating = val.rating;
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
