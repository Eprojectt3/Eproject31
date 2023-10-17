import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { VnpaySuccessComponent } from './vnpay-success/vnpay-success.component';
import { PaypalSuccessComponent } from './paypal-success/paypal-success.component';

const routes: Routes = [
  { path: 'vnpay-success', component: VnpaySuccessComponent },
  { path: 'paypal-success', component: PaypalSuccessComponent },
  { path: '', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
