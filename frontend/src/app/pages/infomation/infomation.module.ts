import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfomationRoutingModule } from './infomation-routing.module';
import { InfomationComponent } from './infomation.component';

// Material angular
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { AppModule } from 'src/app/app.module';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { HotelsListComponent } from './hotels/hotels-list/hotels-list.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { RestaurantsListComponent } from './restaurants/restaurants-list/restaurants-list.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { ResortsListComponent } from './resorts/resorts-list/resorts-list.component';
import { ResortDetailComponent } from './resorts/resort-detail/resort-detail.component';
import { ToursListComponent } from './tours/tours-list/tours-list.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    InfomationComponent,
    HotelsListComponent,
    HotelDetailComponent,
    RestaurantsListComponent,
    RestaurantDetailComponent,
    ResortsListComponent,
    ResortDetailComponent,
    ToursListComponent,
    TourDetailComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    InfomationRoutingModule,
    MatCardModule,
    MatIconModule,
    CarouselModule,
    CardModule,
    PipeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    ImageModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class InfomationModule {}
