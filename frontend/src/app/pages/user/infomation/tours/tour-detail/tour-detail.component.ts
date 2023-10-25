import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { Tour } from 'src/app/models/tour';
import { ServiceService } from 'src/app/services/service.service';
import { TitleService } from 'src/app/services/title.service';
import { TourService } from 'src/app/services/tour.service';
import { GalleryComponent } from '../gallery/gallery.component';
import { TransportationService } from 'src/app/services/transportation.service';
import { Transportation } from 'src/app/models/transportation.model';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Itinerary } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
})
export class TourDetailComponent implements OnInit {
  id!: number;
  tour!: Tour;
  transportations!: Transportation[];
  services?: Service[] = [];
  images: any = [];
  imagesCount!: number;
  transportationTour!: Transportation[];
  itineraries!: Itinerary[];
  itinerary!: Itinerary[];
  listImages: any = [];

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private tourService: TourService,
    private serviceService: ServiceService,
    public dialog: MatDialog,
    private transportationSrvice: TransportationService,
    public itineraryService: ItineraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitleValue('Tour detail');

    // Get id tour
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Get tour detail
    this.tourService.getDetailTour(this.id).subscribe((val) => {
      this.tour = val;
      console.log(this.tour);

      this.listImages = val.urlImage;
      this.imagesCount = val.urlImage.length;
      this.images = val.urlImage.slice(0, 3);

      // Get list Transportation
      this.transportationSrvice
        .getListTransportation()
        .subscribe((val: Transportation[]) => {
          this.transportations = val;

          this.transportationTour = this.transportations.filter(
            (item: Transportation) => {
              return item.id == this.tour.transportation_ID;
            }
          );

          // Get list itineraryService
          this.itineraryService
            .getListItinerary()
            .subscribe((val: Itinerary[]) => {
              this.itinerary = val;

              this.itineraries = val.filter((item: Itinerary) => {
                return item?.tourID === this.tour.id;
              });
            });
        });
    });

    // Get list service tour
    this.serviceService.getListService().subscribe((val: Service[]) => {
      this.services = val.filter((item) => {
        return item.tour_ID == this.id;
      });
    });
  }

  public openGalery = () => {
    const dialogRef = this.dialog.open(GalleryComponent, {
      width: '800px',
      data: this.listImages,
    });
  };

  // Navigate query booking
  navigateToBooking = () => {
    const queryParams = {
      tour_id: this.tour.id,
      tour: this.tour.name,
      range_time: this.tour.range_time,
    };
    this.router.navigate(['/user/order'], { queryParams });
  };
}
