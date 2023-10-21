import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { HotelService } from 'src/app/services/hotel.service';
import { TitleService } from 'src/app/services/title.service';
import { Hotel } from '../../../../../models/hotel';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from '../../tours/gallery/gallery.component';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
})
export class HotelDetailComponent implements OnInit {
  hotel!: Hotel;
  images: any = [];
  listImages: any = [];
  imagesCount!: number;

  constructor(
    private titleService: TitleService,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  fatwitter = faTwitter;
  faFace = faFacebook;

  ngOnInit(): void {
    this.titleService.setTitleValue('Hotels Detail');
    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');

        if (id) {
          this.placeService.getPlaceById(id).subscribe({
            next: (response: any) => {
              this.hotel = response;
              console.log(this.hotel);
              this.listImages = response.urlImage;
              this.images = response.urlImage.slice(0, 3);
              this.imagesCount = response.urlImage.length;
            },
          });
        }
      },
    });
  }

  public openGalery = () => {
    const dialogRef = this.dialog.open(GalleryComponent, {
      width: '800px',
      data: this.listImages,
    });
  };
}

// Hàm để chọn khách sạn và lấy thông tin chi tiết
// selectHotel(hotelId: number): void {
//   this.selectedHotelId = hotelId;
//   this.getHotelDetail();
// }
