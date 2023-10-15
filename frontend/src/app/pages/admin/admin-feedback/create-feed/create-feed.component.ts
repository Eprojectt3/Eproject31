import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FeedBack } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';


@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss']
})
export class CreateFeedComponent {
  loginForm!: FormGroup;
  feedback!: FeedBack;
  errorMessage: string = '';
  id:number | undefined;
  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<CreateFeedComponent>,
    public feedbackService: FeedbackService,
    public snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
    name: [
      '',
      Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
    ],
    title: [
      '',
      Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
    ],
    phone: [
      '',
      Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
    ],
    email: [
      '',
      Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
    ],
  });
}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loginForm.patchValue(this.data)
  }

  public onSubmit = () => {
    const feedback = {
      id:this.id,
      name: this.loginForm.controls['name'].value,
      title:this.loginForm.controls['title'].value,
      phone:this.loginForm.controls['phone'].value,
      email:this.loginForm.controls['email'].value,

    };

    if (!this.loginForm.controls['name'].errors) {
      if(this.data){
        this.feedbackService
        .updateFeedback(feedback,this.data.id)
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
      }else{
        this.feedbackService
        .createFeedback(this.feedback.name,this.feedback.email,this.feedback.phone,this.feedback.title)
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
