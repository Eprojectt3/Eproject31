import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent, FileUploadErrorEvent } from 'primeng/fileupload';
import { SnackbarService } from '../../../../services/snackbar.service';
import { LocationService } from '../../../../services/location.service';
import { Location } from '../../../../models/location.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  formData: FormData = new FormData();
  loginForm!: FormGroup;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  locations!: Location[];
  restaurant!: Restaurant;
  id!: number;
  location!: any;
  RestaurantDetail!: any;
  urlImages: any = [];
  pathImages: any = [];

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private snackBar: SnackbarService,
    private locationService: LocationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Get restaurant

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.placeService.getPlaceById(this.id).subscribe((val: any) => {
      this.restaurant = val;
      this.formData.append('Id', val.id);
    });

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

    this.placeService.placeSubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);
      this.loginForm.controls['price'].setValue(val.price_range);
      this.loginForm.controls['location'].setValue(val.locationId);
      this.loginForm.controls['phone'].setValue(val.phoneNumber);
      this.loginForm.controls['address'].setValue(val.address);
      this.loginForm.controls['description'].setValue(val.description);
      this.location = val.locationId;

      for (let urlImage of val.urlImage) {
        this.urlImages.push(urlImage);
        this.pathImages.push(urlImage.path);
      }
    });
  }

  onSubmit = async () => {
    for (const uploadImage of this.uploadedImages) {
      this.formData.append('fileCollection', uploadImage, uploadImage.name);
      console.log(uploadImage);
    }

    for (const pathImage of this.pathImages) {
      this.formData.append('path', pathImage);
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
    this.formData.append('place_Type_ID', '3');          
    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['price'].errors &&
      !this.loginForm.controls['location'].errors &&
      !this.loginForm.controls['phone'].errors &&
      !this.loginForm.controls['description'].errors &&
      !this.loginForm.controls['address'].errors
    ) {
      this.placeService.updatePlace(this.formData).subscribe(
        (val) => {  
          this.snackBar.openSnackBar('Update success', 'Success');
          this.router.navigate(['/admin/restaurants'], {
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

  // Upload Image
  public onSelect = ($event: FileSelectEvent) => {
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

  // Update Remove image
  public removeImage = (urlPath: any, urlImage: any) => {
    this.pathImages = this.pathImages.filter((pathImage: any) => {
      return urlPath !== pathImage;
    });

    this.urlImages = this.urlImages.filter((item: any) => {
      return item !== urlImage;
    });
  };

}
