import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Transportation } from 'src/app/models/transportation.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TransportationService } from 'src/app/services/transportation.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-transportation',
  templateUrl: './create-transportation.component.html',
  styleUrls: ['./create-transportation.component.scss']
})
export class CreateTransportationComponent {
  loginForm!: FormGroup;
  transportation!: Transportation;
  errorMessage: string = '';
  id!: number;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<CreateTransportationComponent>,
    public transportationService: TransportationService,
    public snackBarService: SnackbarService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      price: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loginForm.patchValue(this.data)

    // this.transportationService.transportationSubject.subscribe((val: any) => {
    //   this.loginForm.controls['name'].setValue(val.name);



    // });
  }

  onSubmit = async ()  => {
    const transportation= {
      id: this.id,
      name: this.loginForm.controls['name'].value,
      price: this.loginForm.controls['price'].value,
      description: this.loginForm.controls['description'].value,
    };

    if (!this.loginForm.controls['name'].errors) {
      if(this.data){
        this.transportationService
        .updateTransportation(transportation,this.data.id)
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
        this.transportationService
        .createTransportation(transportation)
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
