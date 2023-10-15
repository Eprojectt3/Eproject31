import { Component, Input } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent {
  @Input() tour: any;

  constructor(
    private paymentService: PaymentService,
    private tokenStorage: TokenStorageService
  ) {}

  public payByPaypal = () => {
    const user = this.tokenStorage.getUser();

    const data = {
      name: this.tour.tourName,
      price: this.tour.price.toString(),
      quantity: this.tour.quantity.toString(),
      description: `username: ${user.username}, name: ${user.name}, email: ${user.email}, phone: ${user.phone}`,
    };

    this.paymentService.createOrder(data).subscribe((val) => {
      val = val.links.filter((item: any) => {
        return item.rel === 'approve';
      });

      for (let item of val) {
        window.location.href = item.href;
      }
    });
  };
}
