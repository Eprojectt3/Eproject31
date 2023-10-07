import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListUsersComponent } from './admin-user/list-users/list-users.component';
import { ListCategoriesComponent } from './admin-category/list-categories/list-categories.component';
import { ListToursComponent } from './admin-tour/list-tours/list-tours.component';
import { ListHotelsComponent } from './admin-hotel/list-hotels/list-hotels.component';
import { CreateHotelComponent } from './admin-hotel/create-hotel/create-hotel.component';
import { DetailHotelComponent } from './admin-hotel/detail-hotel/detail-hotel.component';
import { UpdateHotelComponent } from './admin-hotel/update-hotel/update-hotel.component';
import { CreateTourComponent } from './admin-tour/create-tour/create-tour.component';

const routes: Routes = [
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: 'categories',
    component: ListCategoriesComponent,
  },
  {
    path: 'tours',
    component: ListToursComponent,
    children: [{ path: 'create', component: CreateTourComponent }],
  },
  {
    path: 'hotels',
    component: ListHotelsComponent,
    children: [
      {
        path: 'create',
        component: CreateHotelComponent,
      },
      {
        path: 'detail/:id',
        component: DetailHotelComponent,
      },
      {
        path: 'update/:id',
        component: UpdateHotelComponent,
      },
    ],
  },

  { path: '', component: AdminComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
