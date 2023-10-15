import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Order } from 'src/app/models/order.model';
import { Tour } from 'src/app/models/tour';
import { TourDetail } from 'src/app/models/tour-detail.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TourDetailService } from 'src/app/services/tour-detail.service';
import { TourService } from 'src/app/services/tour.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  form!: FormGroup;
  tourName!: string;
  user!: User['userInfo'];
  rangeTime!: number;
  tourId!: number;
  selectedDate1: Date = new Date();
  selectedDate2: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  listTourDetail!: TourDetail[];
  tourDetail!: Tour[];
  isValidOrder: boolean = true;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private tourService: TourService,
    private storageService: TokenStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tourDetailService: TourDetailService,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Create formgroup and form control
    this.form = this.fb.group({
      departure_date: ['', Validators.compose([Validators.required])],
      end_date: ['', Validators.compose([Validators.required])],
      number_of_people: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });

    // Get tour detail
    this.route.queryParams.subscribe((params) => {
      this.tourId = Number(params['tour_id']);
      this.tourName = params['tour'];
      this.rangeTime = Number(params['range_time']);

      this.tourService.getListTour().subscribe((val: any) => {
        const isTourExisted = val.filter((item: any) => {
          return item.name === this.tourName;
        });

        if (isTourExisted.length === 0) {
          this.isValidOrder = false;
        } else {
          this.isValidOrder = true;
        }
      });
    });

    // Get User
    this.user = this.storageService.getUser();

    // Max date
    const currentDate: Date = new Date();
    this.maxDate.setDate(currentDate.getDate() + 7);

    // Check limit quantity of tour
    this.tourService.getDetailTour(this.tourId).subscribe((tour: Tour) => {
      this.tourDetailService
        .getListTourDetail()
        .subscribe((tourDetails: TourDetail[]) => {
          this.listTourDetail = tourDetails.filter((tourDetail: TourDetail) => {
            return tourDetail.tourId === tour.id;
          });

          this.orderService.getListOrders().subscribe((orders: Order[]) => {
            console.log(orders);
          });
        });
    });
  }

  // OnSubmit
  public onSubmit(): void {}

  // Change Date
  public onDate1Change = (e: any) => {
    this.selectedDate2 = new Date(this.selectedDate1);

    this.selectedDate2.setDate(this.selectedDate2.getDate() + this.rangeTime);
  };
}
