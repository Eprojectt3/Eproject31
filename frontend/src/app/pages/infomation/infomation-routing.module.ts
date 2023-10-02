import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfomationComponent } from './infomation.component';
import { HotelsListComponent } from './hotels/hotels-list/hotels-list.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { RestaurantsListComponent } from './restaurants/restaurants-list/restaurants-list.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { ResortsListComponent } from './resorts/resorts-list/resorts-list.component';
import { ResortDetailComponent } from './resorts/resort-detail/resort-detail.component';
import { ToursListComponent } from './tours/tours-list/tours-list.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';

const routes: Routes = [
  { path: 'hotels', component: HotelsListComponent },
  { path: 'hotel-detail/:id', component: HotelDetailComponent },
  { path: 'restaurants', component: RestaurantsListComponent },
  { path: 'restaurant-detail/:id', component: RestaurantDetailComponent },
  { path: 'resorts', component: ResortsListComponent },
  { path: 'resort-detail/:id', component: ResortDetailComponent },
  { path: 'tours', component: ToursListComponent },
  { path: 'tour-detail/:id', component: TourDetailComponent },

  { path: '', component: InfomationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfomationRoutingModule {}
