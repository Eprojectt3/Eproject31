import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Staff} from 'src/app/models/staff.model';
import {Tour} from 'src/app/models/tour';
import {TourDetail} from 'src/app/models/tour-detail.model';
import {User} from 'src/app/models/user.model';
import {StaffService} from 'src/app/services/staff.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {TourDetailService} from 'src/app/services/tour-detail.service';
import {TourService} from 'src/app/services/tour.service';
import {ValidatorFormService} from 'src/app/services/validator-form.service';
import {SnackbarService} from "../../../../services/snackbar.service";

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
  listTourDetailFilter!: any;
  listTourDetail!: any
  tours!: Tour;
  quantity: number = 1;
  isValidOrder: boolean = true;
  totalPrice!: number;
  staff!: Staff[];
  dailyTourDetailMap: Map<string, any[]> = new Map<string, any[]>();
  startDate: any;
  limitQuantity!: number
  @Output() tourInfo = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private tourService: TourService,
    private storageService: TokenStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tourDetailService: TourDetailService,
    private staffService: StaffService,
    private snackBarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    // Create formgroup and form control
    this.form = this.fb.group({
      departure_date: ['', [Validators.required]],
      end_date: ['', Validators.compose([Validators.required])],
      number_of_people: [
        '',
        [this.validatorForm.NoWhitespaceValidator(),
          Validators.min(1),
          this.isExceedLimitQuantityFn.bind(this)]
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

      this.limitQuantity = Number(tour.quantity_limit)

      this.tourDetailService
        .getListTourDetail()
        .subscribe((tourDetails: TourDetail[]) => {
          this.listTourDetail = tourDetails
          this.listTourDetailFilter = tourDetails.filter((tourDetail: TourDetail) => {
            return tourDetail.tourId === tour.id;
          });

          for (let tourDe of this.listTourDetailFilter) {
            this.startDate = new Date(tourDe.start_Date as Date)
              .getDate()
              .toString();

            const dailyTourDetail =
              this.dailyTourDetailMap.get(this.startDate) || [];

            dailyTourDetail.push(tourDe);
            this.dailyTourDetailMap.set(this.startDate, dailyTourDetail);
          }
        });
    });

    // Get list staff
    this.staffService.getListStaff().subscribe((val: Staff[]) => {
      this.staff = val;
    });
  }

  // OnSubmit
  public onSubmit(): void {
    let isStaffActive: boolean = true;
    let staffId: number = 2;

    let filteredStaff: any[] = []

    if (this.staff.length > 0) {
      for (const tourDetail of this.listTourDetail) {
        const foundStaff = this.staff.find(item => item.id === tourDetail.staff_Id)

        if (foundStaff) {
          if (!filteredStaff.includes(foundStaff)) {
            filteredStaff.push(foundStaff)
          }
        }
      }

      const c = this.staff.filter(item => !filteredStaff.includes(item))

      staffId = Math.floor(Math.random() * c.length);

    } else {
      staffId = 2
    }

    const startDate: Date = new Date(this.form.controls['departure_date'].value)
    startDate.setDate(startDate.getDate() + 1)
    const endDate: Date = new Date(this.form.controls['end_date'].value)
    endDate.setDate(endDate.getDate() + 1)

    const tourInformation = {
      tourName: this.tourName,
      price: this.totalPrice,
      quantity: this.form.controls['number_of_people'].value,
      startDate: startDate,
      endDate: endDate,
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
    this.selectedDate1 = e.value;
    this.form.controls['number_of_people'].setValue(1);
    this.selectedDate2 = new Date(this.selectedDate1);

    this.selectedDate2.setDate(this.selectedDate2.getDate() + this.rangeTime);
    // this.isExceedLimitQuantity()
  };

  public changeNumberOfPeople = (e: any) => {
    this.totalPrice = Number(e.target.value) * Number(this.tours.price);
  };

  // Disable day has tour exceed quantity limit
  public isDisable = (d: Date | null): boolean => {
    const day = (d || new Date()).getDate();
    let dayKey!: number
    const arrayKey: string[] = [...this.dailyTourDetailMap.keys()]
    const arrayValue = [...this.dailyTourDetailMap.values()]

    for (const [key, value] of this.dailyTourDetailMap) {
      if (Number(key) === day) {
        for (let val of value) {
          if (val.quantity < 1) {
            return day !== Number(key)
          }
        }
      }
    }
    return true;
  };

  // Check isExceedLimitQuantity
  public isExceedLimitQuantityFn = (control: FormControl) => {
    let isExceedLimitQuantity: boolean = false;
    const currentDate: Date = new Date(this.selectedDate1)
    const arrayKey: string[] = [...this.dailyTourDetailMap.keys()]
    const arrayValue = [...this.dailyTourDetailMap.values()]

    if (arrayKey.includes(String(currentDate.getDate()))) {
      for (let values of arrayValue) {
        for (let value of values) {
          const currentValueDate: number = new Date(value.start_Date).getDate()
          if (currentValueDate === currentDate.getDate()) {
            if (Number(value.quantity) < 1 || Number(control.value) > Number(value.quantity)) {
              this.snackBarService.openSnackBar("The number of people has exceeded", "Error")
              isExceedLimitQuantity = true;
            }
          }
        }
      }
    } else {
      if (this.limitQuantity < control.value) {
        this.snackBarService.openSnackBar("The number of people has exceeded", "Error")
        isExceedLimitQuantity = true;
      }
    }
    return !isExceedLimitQuantity ? null : {exceedLimitQuantity: 'The number of people has exceeded'}
  }
}
