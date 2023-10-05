import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../../services/hotel.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent } from 'primeng/fileupload';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
})
export class CreateHotelComponent implements OnInit {
  loginForm!: FormGroup;
  hotels!: any;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  dataForm: any;
  formData :FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.hotelService.hotelsSubject.subscribe(
      (val: any) => (this.hotels = val?.data),
    );

    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      price: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      location: ['', Validators.required],
      phone: [
        '',
        Validators.compose([
          this.validatorForm.NoWhitespaceValidator(),
          Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        ]),
      ],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      address: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      images: [null],
    });
  }

  // Submit
  onSubmit =async () => {
    for (const uploadImage of this.uploadedImages) {
      this.formData.append('fileCollection', uploadImage, uploadImage.name);
      // this.dataForm.fileCollection.push(uploadImage);
    }
    this.formData.append('Name', this.loginForm.controls['name'].value);
    this.formData.append('Price_range', this.loginForm.controls['price'].value);
    this.formData.append('Location', this.loginForm.controls['location'].value);
    this.formData.append('Description', this.description);
    this.formData.append('Address', this.loginForm.controls['address'].value);
    this.formData.append('PhoneNumber', this.loginForm.controls['phone'].value);


    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['price'].errors &&
      !this.loginForm.controls['location'].errors &&
      !this.loginForm.controls['phone'].errors &&
      !this.loginForm.controls['description'].errors &&
      !this.loginForm.controls['address'].errors
    ) {
      this.hotelService.createHotel(this.formData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Create success', 'Success');
          console.log(this.formData)
        },
        (err) => {
          console.log(err);
          this.snackBar.openSnackBar(err, 'Error');
          console.log(this.formData)
        },
      );
    }
  };

  // Upload Image

  onSelect = ($event: FileSelectEvent) => {
    const uploadedImage = $event.files[0];

    this.uploadedImages.push(uploadedImage);
  };
}
