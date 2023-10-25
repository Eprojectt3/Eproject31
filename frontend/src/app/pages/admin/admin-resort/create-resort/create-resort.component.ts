import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent, FileUploadErrorEvent } from 'primeng/fileupload';
import { LocationService } from 'src/app/services/location.service';
import { PlaceService } from 'src/app/services/place.service';
import { Location } from '../../../../models/location.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-resort',
  templateUrl: './create-resort.component.html',
  styleUrls: ['./create-resort.component.scss']
})
export class CreateResortComponent implements OnInit{
  loginForm!: FormGroup;
  resorts!: any;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  public locations!: Location[];
  formData: FormData = new FormData();
  dataForm: any;
  // place_Type_ID: 1,

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    private snackBar: SnackbarService,
    private locationService: LocationService,
    private router: Router,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.placeService.placeSubject.subscribe(
      (val: any) => (this.resorts = val?.data)
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
    this.formData.append('LocationId', this.loginForm.controls['location'].value);
    this.formData.append('Description', this.description);
    this.formData.append('Address', this.loginForm.controls['address'].value);
    this.formData.append('PhoneNumber', this.loginForm.controls['phone'].value);

    // Thêm place_Type_ID và gán cứng giá trị 1
    this.formData.append('place_Type_ID', '2');

    // const dataForm: Place = {
    //   place: {
    //     name: this.loginForm.controls['name'].value,
    //     rating: 0,
    //     price_range: this.loginForm.controls['price'].value,
    //     locationId: this.loginForm.controls['location'].value,
    //     description: this.description,
    //     address: this.loginForm.controls['address'].value,
    //     phoneNumber: this.loginForm.controls['phone'].value,
    //     place_Type_ID: 1
    //   },
    //   placeTypeId: 1 // Nếu bạn muốn gán cứng placeTypeId
    // };
    console.log(this.formData);
    console.log(this.dataForm);



    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['price'].errors &&
      !this.loginForm.controls['location'].errors &&
      !this.loginForm.controls['phone'].errors &&
      !this.loginForm.controls['description'].errors &&
      !this.loginForm.controls['address'].errors
    ) {
      // const data = {
      //   place_Type_ID: 1,
      // };
      this.placeService.createPlace(this.formData).subscribe(
        (val) => {
          console.log(this.formData)
          this.snackBar.openSnackBar('Create success', 'Success');
          this.router.navigate(['/admin/resorts'], {
            queryParams: { refresh: 'true' },
          });
        },
        (err) => {
          console.log(this.formData)
          console.log(err);
          this.snackBar.openSnackBar(err, 'Error');
          console.log(this.formData);
        }
      );
    }
  };

  // Upload Image

  onSelect = ($event: FileSelectEvent) => {
    const uploadedImage: File = $event.files[0];
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const allowedExtensionName = ['.jpg', '/jpeg', '.png'];

    if (uploadedImage.size < 100000) {
      if (allowedTypes.includes(uploadedImage.type)) {
        allowedExtensionName.map((item) => {
          if (uploadedImage.name.includes(item)) {
            this.uploadedImages.push(uploadedImage);
          }
        });
      }
    } else {
      console.error('File size is too large');
    }
  };

  // Get List Location
  public getListLocations = () => {
    this.locationService.getListLocation().subscribe((val: any) => {
      this.locations = val;
    });
  };

  // Remove Image
  public onRemove = (event: any) => {
    this.uploadedImages = this.uploadedImages.filter((val: File) => {
      return val !== event.file;
    });
  };

  // OnError
  public onError = (event: FileUploadErrorEvent) => {
    console.error(event.error);
  };
}
