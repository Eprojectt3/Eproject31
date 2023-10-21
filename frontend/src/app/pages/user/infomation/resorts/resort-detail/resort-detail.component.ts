import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Hotel } from 'src/app/models/hotel';
import { Resort } from 'src/app/models/resort.model';
import { PlaceService } from 'src/app/services/place.service';

import { ResortService } from 'src/app/services/resort.service';
import { TitleService } from 'src/app/services/title.service';
import { GalleryComponent } from '../../tours/gallery/gallery.component';

@Component({
  selector: 'app-resort-detail',
  templateUrl: './resort-detail.component.html',
  styleUrls: ['./resort-detail.component.scss'],
})
export class ResortDetailComponent {
  resort!: any;
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
    this.titleService.setTitleValue('Resort Detail');

    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');

        if (id) {
          this.placeService.getPlaceById(id).subscribe({
            next: (response: any) => {
              this.resort = response;
              console.log(this.resort);
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
