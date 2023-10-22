import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Resort } from 'src/app/models/resort.model';
import { LocationService } from 'src/app/services/location.service';
import { TourService } from 'src/app/services/tour.service';
import { SearchComponent } from '../search.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-resort',
  templateUrl: './search-resort.component.html',
  styleUrls: ['./search-resort.component.scss'],
})
export class SearchResortComponent {
  hotels!: Resort[];
  form!: FormGroup;
  locations!: any[];

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
      place_Type_ID: 2,
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
        this.router.navigate(['/search-result/resorts'], {
          queryParams: query,
        });
        console.log(val);

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
