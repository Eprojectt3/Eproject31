import { Component } from '@angular/core';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel,hotels } from 'src/app/models/hotel';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent {
  hotels: Hotel[] = hotels;
  constructor(private titleService: TitleService) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Restaurant Detail');
  }
}
