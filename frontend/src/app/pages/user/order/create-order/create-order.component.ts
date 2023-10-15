import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Order } from 'src/app/models/order.model';
import { Staff } from 'src/app/models/staff.model';
import { Tour } from 'src/app/models/tour';
import { TourDetail } from 'src/app/models/tour-detail.model';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { StaffService } from 'src/app/services/staff.service';
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
  tours!: Tour;
  quantity: number = 1;
  isValidOrder: boolean = true;
  totalPrice!: number;
  staff!: Staff[];
  @Output() tourInfo = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private tourService: TourService,
    private storageService: TokenStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tourDetailService: TourDetailService,
    public orderService: OrderService,
    private staffService: StaffService
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

    this.form.controls['number_of_people'].setValue(1);

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
      this.tours = tour;
      this.totalPrice = Number(this.tours.price);

      this.tourDetailService
        .getListTourDetail()
        .subscribe((tourDetails: TourDetail[]) => {
          this.listTourDetail = tourDetails.filter((tourDetail: TourDetail) => {
            return tourDetail.tourId === tour.id;
          });

          this.orderService.getListOrders().subscribe((orders: Order[]) => {
            // console.log(orders);
          });
        });
    });

    // Time
    this.selectedDate2 = new Date(this.selectedDate1);
    this.selectedDate2.setDate(this.selectedDate2.getDate() + this.rangeTime);

    // Get list staff
    this.staffService.getListStaff().subscribe((val) => {
      this.staff = val;
    });
  }

  // OnSubmit
  public onSubmit(): void {
    let isStaffActive: boolean = true;
    let staffId: number = 0;

    do {
      staffId = Math.floor(Math.random() * this.staff.length);

      this.tourDetailService.getListTourDetail().subscribe((val: any) => {
        for (let va of val) {
          if (va.staff_Id === staffId) {
            if (va.isActive) {
              isStaffActive = false;
            }
          }
        }
      });
    } while (!isStaffActive);

    const tourInformation = {
      tourName: this.tourName,
      price: this.totalPrice,
      quantity: this.form.controls['number_of_people'].value,
      startDate: new Date(this.form.controls['departure_date'].value),
      endDate: new Date(this.form.controls['end_date'].value),
      priceOfTour: this.tours.price,
      tourId: this.tours.id,
      staff_Id: staffId,
      quantityLimit: this.tours.quantity_limit,
    };

    localStorage.setItem('tourInformation', JSON.stringify(tourInformation));

    this.tourInfo.emit(tourInformation);
  }

  // Change Date
  public onDate1Change = (e: any) => {
    this.selectedDate2 = new Date(this.selectedDate1);

    this.selectedDate2.setDate(this.selectedDate2.getDate() + this.rangeTime);
  };

  public changeNumberOfPeople = (e: any) => {
    this.totalPrice = Number(e.target.value) * Number(this.tours.price);
  };
}
