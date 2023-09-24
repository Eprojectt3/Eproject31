import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { HotelService } from 'src/app/services/hotel.service';
import { TitleService } from 'src/app/services/title.service';
import { Hotel } from '../../../../../models/hotel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
})
export class HotelDetailComponent implements OnInit {
  hotel!: Hotel ;


  constructor(private titleService: TitleService , private hotelService:HotelService,
    private route :ActivatedRoute) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotels Detail');
    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id')

        if(id){
          this.hotelService.getDetailHotel(id).subscribe({
            next:(response:any)=>{
              this.hotel=response;
              console.log(this.hotel=response);
            }
          })


        }
      }
    })



  }
}


// Hàm để chọn khách sạn và lấy thông tin chi tiết
// selectHotel(hotelId: number): void {
//   this.selectedHotelId = hotelId;
//   this.getHotelDetail();
// }
