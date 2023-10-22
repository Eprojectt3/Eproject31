import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { LocationService } from 'src/app/services/location.service';
import { TourService } from 'src/app/services/tour.service';
import { Location } from 'src/app/models/location.model';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchComponent } from '../search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss'],
})
export class SearchHotelComponent implements OnInit {
  hotels!: Hotel[];
  form!: FormGroup;
  locations!: Location[];

  constructor(
    private tourService: TourService,
    private fb: FormBuilder,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<SearchComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Create reactive form
    this.form = this.fb.group({
      name: [''],
      location: [''],
      rating: [''],
    });

    // Get list location
    this.getListLocation();
  }

  // Get list location
  public getListLocation = () => {
    this.locationService
      .getListLocation()
      .subscribe((locations: Location[]) => {
        this.locations = locations;
      });
  };

  public onSubmit = () => {
    const data: any = {
      pageIndex: 1,
      pageSize: 12,
      place_Type_ID: 1,
    };

    const query: any = {};

    if (this.form.controls['name'].value) {
      data.search = this.form.controls['name'].value;
      query.search = this.form.controls['name'].value;
    }
    if (this.form.controls['location'].value) {
      data.location = this.form.controls['location'].value;
      query.location = this.form.controls['location'].value;
    }
    if (this.form.controls['rating'].value) {
      data.rating = this.form.controls['rating'].value;
      query.rating = this.form.controls['rating'].value;
    }

    this.tourService.searchPlace(data).subscribe(
      (val: any) => {
        this.router.navigate(['/search-result/hotels'], { queryParams: query });
        this.dialogRef.close();
      },
      (err) => {
        console.error(err);
      }
    );
  };

  // Close dialog
  public isCloseDialog = () => {
    this.dialogRef.close();
  };
}
