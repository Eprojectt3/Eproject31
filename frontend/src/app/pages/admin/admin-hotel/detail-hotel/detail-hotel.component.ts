import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../../models/hotel';
import { HotelService } from '../../../../services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss'],
})
export class DetailHotelComponent implements OnInit {
  public hotel!: Hotel;
  public id!: number;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.hotelService.getDetailHotel(this.id).subscribe((val: any) => {
      this.hotel = val;
      console.log(this.hotel);
    });
  }
}
