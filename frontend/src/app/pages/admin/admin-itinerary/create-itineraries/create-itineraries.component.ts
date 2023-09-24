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


@Component({
  selector: 'app-create-itineraries',
  templateUrl: './create-itineraries.component.html',
  styleUrls: ['./create-itineraries.component.scss']
})
export class CreateItinerariesComponent implements OnInit {
  loginForm!: FormGroup;
  itinearies!: Itinerary;
  // description!: any;
   tours!: Tour[];
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
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {

  }
  ngOnInit(): void {
    this.itineraryService.itinerarySubject.subscribe(
      (val: any) => (this.itinearies = val?.data)
    );
    this.getListTours();
    console.log(this.data);
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
      type: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });

  }

  onSubmit = async () => {
    const itinearies = {
      tour_Name:this.loginForm.controls['tour_Name'].value,
      description:this.loginForm.controls['description'].value,
      sequence:this.loginForm.controls['sequence'].value,
      type:this.loginForm.controls['type'].value,

    };

    if (!this.loginForm.controls['tour_Name'].errors) {
        this.itineraryService
        .createItinerary(this.itinearies.tour_Name,this.itinearies.sequence,this.itinearies.description,this.itinearies.type)
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
  };
  // Get List Location
  public getListTours = () => {
    this.tourService.getListTour().subscribe((val: any) => {
      this.tours = val;
    });
  };





}
