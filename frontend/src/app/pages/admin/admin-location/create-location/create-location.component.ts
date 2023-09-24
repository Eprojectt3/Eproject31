import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent {
  loginForm!: FormGroup;
  location!: Location;
  errorMessage: string = '';
  id!: number;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<CreateLocationComponent>,
    public locationService: LocationService,
    public snackBarService: SnackbarService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.loginForm = this.fb.group({
      state: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loginForm.patchValue(this.data)

    this.locationService.locationsSubject.subscribe((val: any) => {
      this.loginForm.controls['state'].setValue(val.state);



    });
  }

  onSubmit = async ()  => {
    const location= {
      id: this.id,
      state: this.loginForm.controls['state'].value,

    };

    if (!this.loginForm.controls['state'].errors) {
      if(this.data){
        this.locationService
        .updateLocation(location, this.data.id)
        .subscribe({
          next:(val:any)=>{
            this.snackBarService.openSnackBar('Update successfully', 'Success');
            this.errorMessage = '';
            this.dialogRef.close('success');
          }
        }),
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        };

      }else{
        this.locationService
        .createLocation(location)
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

    }
  };
}
