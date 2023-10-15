import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-paypal-success',
  templateUrl: './paypal-success.component.html',
  styleUrls: ['./paypal-success.component.scss'],
})
export class PaypalSuccessComponent implements OnInit {
  isSuccess!: boolean;
  token!: string;
  payerId!: string;

  constructor(
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token') as string;
      this.payerId = params.get('PayerID') as string;

      const user = this.tokenStorage.getUser();
      const tourInfomation = JSON.parse(
        localStorage.getItem('tourInformation') as string
      );

      const data = {
        userID: user.id,
        orderid: this.token,
        tour_Detail_Payment_Dto: {
          tourId: tourInfomation.tourId,
          start_Date: tourInfomation.startDate,
          end_Date: tourInfomation.endDate,
          quantity: tourInfomation.quantityLimit,
          staff_Id: tourInfomation.staff_Id,
        },
      };

      this.paymentService.capturePayment1(data).subscribe((val: any) => {
        if (val.message === 'successful') {
          this.isSuccess = true;
          console.log('success');
        } else if (val.message === 'Failed') {
          this.isSuccess = false;
          console.log('failed');
        }
        console.log(val);
      });
    });
  }
}
