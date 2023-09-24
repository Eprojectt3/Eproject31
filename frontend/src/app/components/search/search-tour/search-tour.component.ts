import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Tour } from 'src/app/models/tour';
import { CategoryService } from 'src/app/services/category.service';
import { LocationService } from 'src/app/services/location.service';
import { TourService } from 'src/app/services/tour.service';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';
import { SearchComponent } from '../search.component';
import { MatDialogRef } from '@angular/material/dialog';

export const ratings = [0, 1, 2, 3, 4, 5];

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.component.html',
  styleUrls: ['./search-tour.component.scss'],
})
export class SearchTourComponent implements OnInit {
  public searchForm!: FormGroup;
  categories: Category[] = [];
  locations: Location[] = [];
  ratings: number[] = ratings;

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    public router: Router,
    public dialogRef: MatDialogRef<SearchComponent>
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name_tour: [''],
      category_tour: [''],
      from_price: [''],
      to_price: [''],
      location: [''],
      rating: [''],
    });

    // Get list category
    this.categoryService
      .getListCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    // Get list location
    this.locationService
      .getListLocation()
      .subscribe((locations: Location[]) => {
        this.locations = locations;
      });
  }

  // Submit search tour
  public onSubmit = () => {
    const data: any = {};

    if (this.searchForm.controls['name_tour'].value) {
      data.name = this.searchForm.controls['name_tour'].value;
    }
    if (this.searchForm.controls['category_tour'].value) {
      data.category_Id = this.searchForm.controls['category_tour'].value;
    }
    if (this.searchForm.controls['from_price'].value) {
      if (this.searchForm.controls['to_price'].value) {
        data.price = `${this.searchForm.controls['from_price'].value}-${this.searchForm.controls['to_price'].value}`;
      } else {
        data.price = this.searchForm.controls['from_price'].value;
      }
    }
    if (this.searchForm.controls['to_price'].value) {
      if (this.searchForm.controls['from_price'].value) {
        data.price = `${this.searchForm.controls['from_price'].value}-${this.searchForm.controls['to_price'].value}`;
      } else {
        data.price = `0-${this.searchForm.controls['to_price'].value}`;
      }
    }
    if (this.searchForm.controls['rating'].value) {
      data.rating = this.searchForm.controls['rating'].value;
    }

    this.tourService.searchTour(data).subscribe(
      (tours: Tour[]) => {
        this.router.navigate(['/search-result']);
        this.dialogRef.close();
      },
      (err) => {
        console.error(err);
      }
    );
  };

  public isCloseDialog = () => {
    this.dialogRef.close();
  };
}
