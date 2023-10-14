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
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateHotelComponent } from './admin-hotel/create-hotel/create-hotel.component';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogCreateComponent } from './admin-category/dialog-create/dialog-create.component';
import { DetailHotelComponent } from './admin-hotel/detail-hotel/detail-hotel.component';
import { MatDividerModule } from '@angular/material/divider';
import { ImageModule } from 'primeng/image';
import { UpdateHotelComponent } from './admin-hotel/update-hotel/update-hotel.component';
import { CreateTourComponent } from './admin-tour/create-tour/create-tour.component';
import { DeleteFeedComponent } from './admin-feedback/delete-feed/delete-feed.component';
import { CreateFeedComponent } from './admin-feedback/create-feed/create-feed.component';
import { DeleteCateComponent } from './admin-category/delete-cate/delete-cate.component';
import { CreateItinerariesComponent } from './admin-itinerary/create-itineraries/create-itineraries.component';
import { DeleteItinerariesComponent } from './admin-itinerary/delete-itineraries/delete-itineraries.component';
import { CreateLocationComponent } from './admin-location/create-location/create-location.component';
import { DeleteLocationComponent } from './admin-location/delete-location/delete-location.component';
import { CreateOrderComponent } from './admin-order/create-order/create-order.component';
import { DeleteOrderComponent } from './admin-order/delete-order/delete-order.component';
import { CreateRoleComponent } from './admin-role/create-role/create-role.component';
import { DeleteRoleComponent } from './admin-role/delete-role/delete-role.component';
import { CreateServiceComponent } from './admin-service/create-service/create-service.component';
import { DeleteServiceComponent } from './admin-service/delete-service/delete-service.component';
import { CreateTransportationComponent } from './admin-transportation/create-transportation/create-transportation.component';
import { DeleteTransportationsComponent } from './admin-transportation/delete-transportations/delete-transportations.component';
import { CreateResortComponent } from './admin-resort/create-resort/create-resort.component';
import { UpdateResortComponent } from './admin-resort/update-resort/update-resort.component';
import { DetailResortComponent } from './admin-resort/detail-resort/detail-resort.component';
import { CreateRestaurantComponent } from './admin-restaurant/create-restaurant/create-restaurant.component';
import { UpdateRestaurantComponent } from './admin-restaurant/update-restaurant/update-restaurant.component';
import { DetailRestaurantComponent } from './admin-restaurant/detail-restaurant/detail-restaurant.component';


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
    DialogCreateComponent,
    CreateHotelComponent,
    DetailHotelComponent,
    UpdateHotelComponent,
    CreateTourComponent,
    DeleteFeedComponent,
    CreateFeedComponent,
    DeleteCateComponent,
    CreateItinerariesComponent,
    DeleteItinerariesComponent,
    CreateLocationComponent,
    DeleteLocationComponent,
    CreateOrderComponent,
    DeleteOrderComponent,
    CreateRoleComponent,
    DeleteRoleComponent,
    CreateServiceComponent,
    DeleteServiceComponent,
    CreateTransportationComponent,
    DeleteTransportationsComponent,
    CreateResortComponent,
    UpdateResortComponent,
    DetailResortComponent,
    CreateRestaurantComponent,
    UpdateRestaurantComponent,
    DetailRestaurantComponent,

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
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CKEditorModule,
    FileUploadModule,
    MatDividerModule,
    ImageModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
