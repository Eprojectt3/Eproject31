import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { Tour } from 'src/app/models/tour';
import { ServiceService } from 'src/app/services/service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TourService } from 'src/app/services/tour.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
})
export class CreateServiceComponent {
  loginForm!: FormGroup;
  service!: Service;
  errorMessage: string = '';
  tours!: Tour[];
  id!: number;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<CreateServiceComponent>,
    public serviceService: ServiceService,
    public snackBarService: SnackbarService,
    private tourService: TourService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      tour_Name: ['', Validators.required],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
    this.getListTours()
  }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getListTours();
    this.loginForm.patchValue(this.data);


    this.serviceService.serviceSubject.subscribe(
      (val: any) => (this.service = val?.data)
    );
  }

  public onSubmit = () => {
    const service = {
      // id: this.data.id,
      name: this.loginForm.controls['name'].value,
      tour_ID: Number (this.loginForm.controls['tour_Name'].value),
      description: this.loginForm.controls['description'].value,
    };
    console.log(service);

    if (!this.loginForm.controls['name'].errors) {
      if (this.data) {
        this.serviceService
          .updateService(service, this.data.id)
          .subscribe((val: any) => {
            this.snackBarService.openSnackBar('Update successfully', 'Success');
            this.errorMessage = '';
            this.dialogRef.close('success');
          }),
          (err: any) => {
            this.errorMessage = err?.error?.message;

            console.log(this.errorMessage);
            this.snackBarService.openSnackBar(this.errorMessage, 'Error');
          };
      } else {
        this.serviceService.createService(service).subscribe((val: any) => {
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
    }
  };
  public getListTours = () => {
    this.tourService.getListTour().subscribe((val: any) => {
      this.tours = val;
    });
  };
}

