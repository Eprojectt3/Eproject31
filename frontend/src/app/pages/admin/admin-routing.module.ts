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
import { ListFeedbacksComponent } from './admin-feedback/list-feedbacks/list-feedbacks.component';
import { DialogCreateComponent } from './admin-category/dialog-create/dialog-create.component';
import { ListRolesComponent } from './admin-role/list-roles/list-roles.component';
import { CreateRoleComponent } from './admin-role/create-role/create-role.component';
import { ListTransportationsComponent } from './admin-transportation/list-transportations/list-transportations.component';
import { CreateTransportationComponent } from './admin-transportation/create-transportation/create-transportation.component';
import { ListServicesComponent } from './admin-service/list-services/list-services.component';
import { CreateServiceComponent } from './admin-service/create-service/create-service.component';
import { ListLocationsComponent } from './admin-location/list-locations/list-locations.component';
import { CreateLocationComponent } from './admin-location/create-location/create-location.component';
import { ListItinerariesComponent } from './admin-itinerary/list-itineraries/list-itineraries.component';
import { CreateItinerariesComponent } from './admin-itinerary/create-itineraries/create-itineraries.component';
import { ListResortsComponent } from './admin-resort/list-resorts/list-resorts.component';
import { CreateResortComponent } from './admin-resort/create-resort/create-resort.component';
import { DetailResortComponent } from './admin-resort/detail-resort/detail-resort.component';
import { UpdateResortComponent } from './admin-resort/update-resort/update-resort.component';
import { CreateRestaurantComponent } from './admin-restaurant/create-restaurant/create-restaurant.component';
import { DetailRestaurantComponent } from './admin-restaurant/detail-restaurant/detail-restaurant.component';
import { UpdateRestaurantComponent } from './admin-restaurant/update-restaurant/update-restaurant.component';
import { ListRestaurantsComponent } from './admin-restaurant/list-restaurants/list-restaurants.component';

const routes: Routes = [
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: 'categories',
    component: ListCategoriesComponent,
    children: [
      {
        path: 'create',
        component: DialogCreateComponent,
      },
    ],
  },
  { path: '', component: AdminComponent, pathMatch: 'full' },

  {
    path: 'feedbacks',
    component: ListFeedbacksComponent,
  },

  {
    path: 'roles',
    component: ListRolesComponent,
    children: [
      {
        path: 'create',
        component: CreateRoleComponent,
      },

    ],
  },
  {
    path: 'locations',
    component: ListLocationsComponent,
    children: [
      {
        path: 'create',
        component: CreateLocationComponent,
      },

    ],
  },
  {
    path: 'itineraries',
    component: ListItinerariesComponent,
    children: [
      {
        path: 'create',
        component: CreateItinerariesComponent,
      },

    ],
  },
  {
    path: 'transportations',
    component: ListTransportationsComponent,
    children: [
      {
        path: 'create',
        component: CreateTransportationComponent,
      },

    ],
  },
  {
    path: 'services',
    component: ListServicesComponent,
    children: [
      {
        path: 'create',
        component: CreateServiceComponent,
      },

    ],
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
  {
    path: 'resorts',
    component: ListResortsComponent,
    children: [
      {
        path: 'create',
        component: CreateResortComponent,
      },
      {
        path: 'detail/:id',
        component: DetailResortComponent,
      },
      {
        path: 'update/:id',
        component: UpdateResortComponent,
      },
    ],
  },
  {
    path: 'restaurants',
    component: ListRestaurantsComponent,
    children: [
      {
        path: 'create',
        component: CreateRestaurantComponent,
      },
      {
        path: 'detail/:id',
        component: DetailRestaurantComponent,
      },
      {
        path: 'update/:id',
        component: UpdateRestaurantComponent,
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
