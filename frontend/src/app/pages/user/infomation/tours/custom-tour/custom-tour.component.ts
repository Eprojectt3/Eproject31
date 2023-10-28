import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InformationService } from 'src/app/services/information.service';
import { LocationService } from 'src/app/services/location.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TransportationService } from 'src/app/services/transportation.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-custom-tour',
  templateUrl: './custom-tour.component.html',
  styleUrls: ['./custom-tour.component.scss'],
})
export class CustomTourComponent implements OnInit {
  infomation: any;
  form!: FormGroup;
  user: any;
  location: any;
  transportations: any;
  description!: string;
  Editor = ClassicEditor;

  constructor(
    private informationService: InformationService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private locationService: LocationService,
    private transportationService: TransportationService,
    private validationService: ValidatorFormService,
    private snackBarService: SnackbarService,
    public dialogRef: MatDialogRef<CustomTourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Form
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      transportation: ['', [Validators.required]],
      departure_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      number_people: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      description: ['', [this.validationService.NoWhitespaceValidator()]],
      name: ['', [this.validationService.NoWhitespaceValidator()]],
      email: [
        '',
        [
          this.validationService.NoWhitespaceValidator(),
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      phone: [
        '',
        [
          this.validationService.NoWhitespaceValidator(),
          Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        ],
      ],
    });

    // Get user
    this.user = this.tokenStorageService.getUser();

    // Get locations
    this.locationService.getListLocation().subscribe((val) => {
      this.location = val;
    });

    // get list transportations
    this.transportationService
      .getListTransportation()
      .subscribe((val) => (this.transportations = val));
  }

  // Submit
  public onSubmit = () => {
    let data = {};

    if (this.user) {
      data = {
        location: this.form.controls['location'].value,
        createBy: this.user.name,
        createDate: new Date(),
        transportation: this.form.controls['transportation'].value,
        departure_Date: new Date(this.form.controls['departure_date'].value),
        end_Date: new Date(this.form.controls['end_date'].value),
        destination: this.form.controls['destination'].value,
        description: this.description,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
      };
    } else {
      data = {
        location: this.form.controls['location'].value,
        createBy: this.form.controls['name'].value,
        createDate: new Date(),
        transportation: this.form.controls['transportation'].value,
        departure_Date: new Date(this.form.controls['departure_date'].value),
        end_Date: new Date(this.form.controls['end_date'].value),
        destination: this.form.controls['destination'].value,
        description: this.description,
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        phone: this.form.controls['phone'].value,
      };
    }

    if (this.user) {
      if (
        !this.form.controls['location'].errors &&
        !this.form.controls['transportation'].errors &&
        !this.form.controls['departure_date'].errors &&
        !this.form.controls['end_date'].errors &&
        !this.form.controls['destination'].errors &&
        !this.form.controls['description'].errors
      ) {
        this.informationService.createInformation(data).subscribe(
          (val) => {
            this.snackBarService.openSnackBar('Send successfully', 'Success');
            this.isClose();
          },
          (err) => {
            this.snackBarService.openSnackBar(err, 'Error');
            console.error(err);
          }
        );
      }
    } else {
      if (
        !this.form.controls['location'].errors &&
        !this.form.controls['transportation'].errors &&
        !this.form.controls['departure_date'].errors &&
        !this.form.controls['end_date'].errors &&
        !this.form.controls['destination'].errors &&
        !this.form.controls['description'].errors &&
        !this.form.controls['name'].errors &&
        !this.form.controls['email'].errors &&
        !this.form.controls['phone'].errors
      ) {
        this.informationService.createInformation(data).subscribe(
          (val) => {
            this.snackBarService.openSnackBar('Send successfully', 'Success');
            this.isClose();
          },
          (err) => {
            this.snackBarService.openSnackBar(err, 'Error');
            console.error(err);
          }
        );
      }
    }
  };

  isClose = () => {
    this.dialogRef.close();
  };
}
