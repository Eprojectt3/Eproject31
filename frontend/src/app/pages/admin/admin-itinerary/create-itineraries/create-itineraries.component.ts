import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SnackbarService } from '../../../../services/snackbar.service';
import { Itinerary } from 'src/app/models/itinerary.model';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/services/tour.service';
import { ItineraryService } from '../../../../services/itinerary.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Place } from 'src/app/models/place.model';
import { PlaceService } from '../../../../services/place.service';
import { PlaceType } from 'src/app/models/place-type.model';

@Component({
  selector: 'app-create-itineraries',
  templateUrl: './create-itineraries.component.html',
  styleUrls: ['./create-itineraries.component.scss'],
})
export class CreateItinerariesComponent implements OnInit {
  loginForm!: FormGroup;
  itinearies!: Itinerary;
  // description!: any;
  tours!: Tour[];
  places!: Place[];
  placeType!: PlaceType[];
  errorMessage: string = '';
  id!: number;
  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CreateItinerariesComponent>,
    private snackBar: SnackbarService,
    private itineraryService: ItineraryService,
    private tourService: TourService,
    private PlaceService: PlaceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.loginForm = this.fb.group({
      tour_Name: ['', Validators.required],
      sequence: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      type: ['', Validators.required],
      place_Name: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loginForm.patchValue(this.data)
    this.getListTours();
    this.getListPlace();
    this.getListPlaceType();

    this.itineraryService.itinerarySubject.subscribe(
      (val: any) => (this.itinearies = val?.data)
    );

    // console.log(this.data);


  }

  onSubmit = async () => {
    const itinearies = {
      // id: this.data.id,
      tourID: Number (this.loginForm.controls['tour_Name'].value),
      description: this.loginForm.controls['description'].value,
      sequence: this.loginForm.controls['sequence'].value,
      place_Type_ID: Number (this.loginForm.controls['type'].value),
      placeId: Number (this.loginForm.controls['place_Name'].value),
    };
    console.log(itinearies);

    if (!this.loginForm.controls['tour_Name'].errors) {

      if(this.data){
        this.itineraryService
        .updateItinerary(itinearies,this.data.id)
        .subscribe((val: any) => {
          this.snackBar.openSnackBar('Update successfully', 'Success');
          this.errorMessage = '';
          this.dialogRef.close('success');
        }),
        (err: any) => {
          // this.errorMessage = err?.error?.message;
          console.log(err);
          this.snackBar.openSnackBar(this.errorMessage, 'Error');
        };
      }else{

        this.itineraryService
          .createItinerary(itinearies)
          .subscribe((val: any) => {
            this.snackBar.openSnackBar('Create successfully', 'Success');
            this.errorMessage = '';
            this.dialogRef.close('success');
          }),
          (err: any) => {
            // this.errorMessage = err?.error?.message;
            console.log(err);
            this.snackBar.openSnackBar(this.errorMessage, 'Error');
          };
      }
    }
  };
  // Get List Location
  public getListTours = () => {
    this.tourService.getListTour().subscribe((val: any) => {
      this.tours = val;
    });
  };

  public getListPlace = () => {
    this.PlaceService.getListPlace().subscribe((val: any) => {
      this.places = val;
    });
  };
  public getListPlaceType = () => {
    this.PlaceService.getListPlaceType().subscribe((val: any) => {
      this.placeType = val;
    });
  };
}
