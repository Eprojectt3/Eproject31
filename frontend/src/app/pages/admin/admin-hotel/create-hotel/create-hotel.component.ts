import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../services/hotel.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent } from 'primeng/fileupload';
import { SnackbarService } from '../../../../services/snackbar.service';
import { LocationService } from '../../../../services/location.service';
import { Location } from '../../../../models/location.model';

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
  public locations!: Location[];
  formData: FormData = new FormData();
  dataForm: any;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private snackBar: SnackbarService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelService.hotelsSubject.subscribe(
      (val: any) => (this.hotels = val?.data)
    );

    // Get list locations
    this.getListLocations();

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
  onSubmit = async () => {
    for (const uploadImage of this.uploadedImages) {
      this.formData.append('fileCollection', uploadImage, uploadImage.name);
    }
    this.formData.append('Name', this.loginForm.controls['name'].value);
    this.formData.append('Rating', '0');
    this.formData.append('Price_range', this.loginForm.controls['price'].value);
    this.formData.append(
      'LocationId',
      this.loginForm.controls['location'].value
    );
    this.formData.append('Description', this.description);
    this.formData.append('Address', this.loginForm.controls['address'].value);
    this.formData.append('PhoneNumber', this.loginForm.controls['phone'].value);

    this.dataForm = {
      Name: this.loginForm.controls['name'].value,
      Rating: '0',
      Price_range: this.loginForm.controls['price'].value,
      LocationId: this.loginForm.controls['location'].value,
      Description: this.description,
      Address: this.loginForm.controls['address'].value,
      PhoneNumber: this.loginForm.controls['phone'].value,
      fileCollection: this.uploadedImages,
    };

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
          this.router.navigate(['/admin/hotels'], {
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

  // Upload Image

  onSelect = ($event: FileSelectEvent) => {
    const uploadedImage = $event.files[0];

    this.uploadedImages.push(uploadedImage);
  };

  // Get List Location
  public getListLocations = () => {
    this.locationService.getListLocation().subscribe((val: any) => {
      this.locations = val;
      console.log(this.locations);
    });
  };

  // Remove Image
  public onRemove = (event: any) => {
    this.uploadedImages = this.uploadedImages.filter((val: File) => {
      return val !== event.file;
    });
  };
}
