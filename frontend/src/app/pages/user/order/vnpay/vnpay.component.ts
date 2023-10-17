import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewTypeCheckable } from '@ckeditor/ckeditor5-engine';
import { PaymentService } from 'src/app/services/payment.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-vnpay',
  templateUrl: './vnpay.component.html',
  styleUrls: ['./vnpay.component.scss'],
})
export class VnpayComponent implements OnInit {
  @Input() tour: any;

  constructor(
    private paymentService: PaymentService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  public payByVnPay = () => {
    const user = this.tokenStorage.getUser();
    // console.log(this.tour);

    const data = {
      name: this.tour.tourName,
      price: (this.tour.price * 24456).toString(),
      quantity: this.tour.quantity.toString(),
      description: `username: ${user.username}, name: ${user.name}, email: ${user.email}, phone: ${user.phone}`,
    };

    this.paymentService.getPayment(data).subscribe((val: any) => {
      window.location.href = val.message;
    });
  };
}
