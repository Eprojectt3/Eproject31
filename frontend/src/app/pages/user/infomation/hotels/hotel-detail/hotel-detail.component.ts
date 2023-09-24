import { Component, OnInit } from '@angular/core';
import { faFacebook ,faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel } from 'src/app/models/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotels!: Hotel[] ;
  selectedHotelId: number | null = null;
  constructor(private titleService: TitleService , private hotelService:HotelService) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotels Detail');

  }
  }


  // Hàm để chọn khách sạn và lấy thông tin chi tiết
  // selectHotel(hotelId: number): void {
  //   this.selectedHotelId = hotelId;
  //   this.getHotelDetail();
  // }



