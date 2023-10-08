import { Component } from '@angular/core';
import { Filter, filter } from 'src/app/models/filter.model';
import { Tour } from 'src/app/models/tour';
import { TitleService } from 'src/app/services/title.service';
import { RestaurantService } from '../../../../../services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
})
export class RestaurantsListComponent {
  restaurants!: Restaurant[];
  selected = 'none';
  filters: Filter[] = filter;

  constructor(
    private titleService: TitleService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Restaurant List');
    this.restaurantService.GetListRestaurant().subscribe((val: any) => {
      this.restaurants = val;

      for (let res of this.restaurants) {
        const firstPeriodIndex = res.description.indexOf('.');
        if (firstPeriodIndex !== -1) {
          res.description = res.description.slice(0, firstPeriodIndex + 1);
        }
      }
    });
  }
}
