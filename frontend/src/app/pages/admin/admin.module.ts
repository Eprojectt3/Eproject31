import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ListUsersComponent } from './admin-user/list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';
import { ListCategoriesComponent } from './admin-category/list-categories/list-categories.component';
import { ListFeedbacksComponent } from './admin-feedback/list-feedbacks/list-feedbacks.component';
import { ListHotelsComponent } from './admin-hotel/list-hotels/list-hotels.component';
import { ListItinerariesComponent } from './admin-itinerary/list-itineraries/list-itineraries.component';
import { ListLocationsComponent } from './admin-location/list-locations/list-locations.component';
import { ListOrdersComponent } from './admin-order/list-orders/list-orders.component';
import { ListResortsComponent } from './admin-resort/list-resorts/list-resorts.component';
import { ListRestaurantsComponent } from './admin-restaurant/list-restaurants/list-restaurants.component';
import { ListRolesComponent } from './admin-role/list-roles/list-roles.component';
import { ListServicesComponent } from './admin-service/list-services/list-services.component';
import { ListToursComponent } from './admin-tour/list-tours/list-tours.component';
import { ListTransportationsComponent } from './admin-transportation/list-transportations/list-transportations.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent,
    ListCategoriesComponent,
    ListFeedbacksComponent,
    ListHotelsComponent,
    ListItinerariesComponent,
    ListLocationsComponent,
    ListOrdersComponent,
    ListResortsComponent,
    ListRestaurantsComponent,
    ListRolesComponent,
    ListServicesComponent,
    ListToursComponent,
    ListTransportationsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
