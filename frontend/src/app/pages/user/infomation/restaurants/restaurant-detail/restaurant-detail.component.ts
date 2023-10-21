import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel } from 'src/app/models/hotel';
import { Restaurant } from 'src/app/models/restaurant';
import { PlaceService } from 'src/app/services/place.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TitleService } from 'src/app/services/title.service';
import { GalleryComponent } from '../../tours/gallery/gallery.component';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent {
  restaurant!: any;
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
    this.titleService.setTitleValue('Restaurant Detail');

    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');

        if (id) {
          this.placeService.getPlaceById(id).subscribe({
            next: (response: any) => {
              this.restaurant = response;
              console.log((this.restaurant = response));

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
