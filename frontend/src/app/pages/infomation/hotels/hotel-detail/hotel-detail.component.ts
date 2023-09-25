import { Component, OnInit } from '@angular/core';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel,hotels } from 'src/app/models/hotel';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotels: Hotel[] = hotels;
  constructor(private titleService: TitleService) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotels Detail');
  }


}
