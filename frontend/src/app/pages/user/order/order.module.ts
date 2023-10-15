import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material angular
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

// Ng Prime
import { DialogModule } from 'primeng/dialog';
import { PaymentComponent } from './payment/payment.component';
import { VnpayComponent } from './vnpay/vnpay.component';
import { PaypalComponent } from './paypal/paypal.component';
import { VnpaySuccessComponent } from './vnpay-success/vnpay-success.component';
import { PaypalSuccessComponent } from './paypal-success/paypal-success.component';

@NgModule({
  declarations: [
    OrderComponent,
    CreateOrderComponent,
    PaymentComponent,
    VnpayComponent,
    PaypalComponent,
    VnpaySuccessComponent,
    PaypalSuccessComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    DialogModule,
    MatTabsModule,
    MatDividerModule,
  ],
})
export class OrderModule {}
