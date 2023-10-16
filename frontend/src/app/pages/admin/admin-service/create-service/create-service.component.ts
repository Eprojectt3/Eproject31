import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from 'src/app/models/service.model';
import { Tour } from 'src/app/models/tour';
import { ServiceService } from 'src/app/services/service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TourService } from 'src/app/services/tour.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent {
  loginForm!: FormGroup;
  service!: Service;
  errorMessage: string = '';
  tours!: Tour[];

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<CreateServiceComponent>,
    public serviceService: ServiceService,
    public snackBarService: SnackbarService,
    private tourService: TourService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {

    this.serviceService.serviceSubject.subscribe(
      (val: any) => (this.service = val?.data)
    );
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      tour_Name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
    this.getListTours()
  }

  public onSubmit = () => {
    const service = {
      name: this.loginForm.controls['name'].value,
      tour_ID:this.loginForm.controls['tour_Name'].value,

      description:this.loginForm.controls['description'].value,


    };
    console.log(this.loginForm.controls['tour_Name'].value);

    if (!this.loginForm.controls['name'].errors) {
      this.serviceService
        .createService(service)
        .subscribe((val: any) => {
          this.snackBarService.openSnackBar('Create successfully', 'Success');
          this.errorMessage = '';
          this.dialogRef.close('success');
        }),
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        };
    }
  };
  public getListTours = () => {
    this.tourService.getListTour().subscribe((val: any) => {
      this.tours = val;
    });
  };

}

