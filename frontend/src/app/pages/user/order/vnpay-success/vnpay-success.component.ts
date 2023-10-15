import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-vnpay-success',
  templateUrl: './vnpay-success.component.html',
  styleUrls: ['./vnpay-success.component.scss'],
})
export class VnpaySuccessComponent implements OnInit {
  isSuccess: boolean = false;
  tourInfo: any;

  constructor(
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const user = this.tokenStorage.getUser();
      const tourInfomation = JSON.parse(
        localStorage.getItem('tourInformation') as string
      );

      const data: any = {
        userID: user.id,
        orderid: params.get('vnp_TxnRef'),
        vnp_ResponseCode: params.get('vnp_ResponseCode'),
        vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
        description: params.get('vnp_OrderInfo'),
        amount: params.get('vnp_Amount'),
        quantity: tourInfomation.quantity,
        tour_Detail_Payment_Dto: {
          tourId: tourInfomation.tourId,
          start_Date: tourInfomation.startDate,
          end_Date: tourInfomation.endDate,
          quantity: tourInfomation.quantityLimit,
          staff_Id: tourInfomation.staff_Id,
        },
      };
      console.log(data);

      if (params.get('vnp_ResponseCode') === '00') {
        this.isSuccess = true;
        this.paymentService.createData(data).subscribe((val: any) => {
          console.log(val);
        });
      } else {
        this.isSuccess = false;
      }
    });
  }
}
