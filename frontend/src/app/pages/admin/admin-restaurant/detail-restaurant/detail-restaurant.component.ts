
import { Hotel } from '../../../../models/hotel';
import { HotelService } from '../../../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-detail-restaurant',
  templateUrl: './detail-restaurant.component.html',
  styleUrls: ['./detail-restaurant.component.scss']
})
export class DetailRestaurantComponent implements OnInit {
  public restaurant!: Restaurant;
  public id!: number;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.placeService.getPlaceById(this.id).subscribe((val: any) => {
      this.restaurant = val;
    });
  }

}
