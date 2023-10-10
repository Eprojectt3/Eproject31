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

const imagePath: Object[] = [
  {
    path: '../../../../../../assets/images/anh_HomePage3 1 (1).jpg',
  },
  {
    path: '../../../../../../assets/images/cat-ba-3553145_1920 1.jpg',
  },
  {
    path: '../../../../../../assets/images/Ha Long.jpg',
  },
  {
    path: '../../../../../../assets/images/hands 1.jpg',
  },
  {
    path: '../../../../../../assets/images/Hotel1 1.jpg',
  },
];

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

    this.imagesCount = imagePath.length;
    this.images = imagePath.slice(0, 3);
  }

  public openGalery = () => {
    const dialogRef = this.dialog.open(GalleryComponent, {
      width: '800px',
      data: imagePath,
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
