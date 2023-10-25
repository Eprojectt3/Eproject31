import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { Role } from 'src/app/models/role.model';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderDetailComponent } from './my-order/order-detail/order-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'infomation',
    loadChildren: () =>
      import('./infomation/infomation.module').then((m) => m.InfomationModule),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin] },
  },
  {
    path: 'my-order',
    component: MyOrderComponent,
    children: [
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
      },
    ],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.User, Role.Admin] },
  },

  // { path: '', component: UserComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
