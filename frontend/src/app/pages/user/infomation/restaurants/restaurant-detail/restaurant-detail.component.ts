import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel} from 'src/app/models/hotel';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent {
  restaurant!:Restaurant;
  constructor(private titleService: TitleService, private restaurantService:RestaurantService, private route:ActivatedRoute) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Restaurant Detail');

    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id')

        if(id){
          this.restaurantService.getDetailRestaurant (id).subscribe({
            next:(response:any)=>{
              this.restaurant=response;
              console.log(this.restaurant=response);
            }
          })

        }
      }
    })
  }
}
