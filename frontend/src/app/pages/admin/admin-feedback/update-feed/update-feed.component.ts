import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../../services/location.service';

import { FeedBack } from 'src/app/models/feedback.model';


@Component({
  selector: 'app-update-feed',
  templateUrl: './update-feed.component.html',
  styleUrls: ['./update-feed.component.scss']
})
export class UpdateFeedComponent implements OnInit {
  formData: FormData = new FormData();
  loginForm!: FormGroup;
  // Editor = ClassicEditor;
  feedback!: FeedBack;
  id!: number;


  constructor(
    private feedbackService: FeedbackService,
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public snackBar: SnackbarService,
    public router: Router,
    public locationService: LocationService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));


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
        Validators.compose([
          this.validatorForm.NoWhitespaceValidator(),
          Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        ]),
      ],
      email: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });

    this.feedbackService.feedbacksSubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);
      this.loginForm.controls['email'].setValue(val.email);
      this.loginForm.controls['phone'].setValue(val.phone);
      this.loginForm.controls['title'].setValue(val.title);


    });
  }

  onSubmit = async () => {


    const feedbackData={
      id: this.id,
      name:this.loginForm.controls['name'].value,
      title:this.loginForm.controls['title'].value,
      phone:this.loginForm.controls['phone'].value,
      email:this.loginForm.controls['email'].value
    }


    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['title'].errors &&
      !this.loginForm.controls['email'].errors &&
      !this.loginForm.controls['phone'].errors

    ) {
      this.feedbackService.updateFeedback(feedbackData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Create success', 'Success');
          this.router.navigate(['/admin/feedbacks'], {
            queryParams: { refresh: 'true' },
          });
        },
        (err) => {
          console.log(err);
          this.snackBar.openSnackBar(err, 'Error');
          console.log(this.formData);
        }
      );
    }
  };





}
