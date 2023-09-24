import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent, FileUploadErrorEvent } from 'primeng/fileupload';
import { Category } from 'src/app/models/category.model';
import { Transportation } from 'src/app/models/transportation.model';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TourService } from 'src/app/services/tour.service';
import { TransportationService } from 'src/app/services/transportation.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss'],
})
export class CreateTourComponent implements OnInit {
  loginForm!: FormGroup;
  tours!: any;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  public category!: Category[];
  public transportation!: Transportation[];
  formData: FormData = new FormData();
  dataForm: any;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private route: ActivatedRoute,
    private tourService: TourService,
    private snackBar: SnackbarService,
    private categoryService: CategoryService,
    private transportationService: TransportationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.tourService.toursSubject.subscribe(
      (val: any) => (this.tours = val?.data)
    );
    this.getListCategory();
    this.getListTransportation();
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      price: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      category:['', Validators.required],
      description: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),

      ],
      quantity_limit: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      departure_Time: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      rating: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      type: [false],
      range_time: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      transportation: ['', Validators.required],
      discount: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      departure_location: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      image: [null],
    });
  }
  onSubmit = async () => {
    for (const uploadImage of this.uploadedImages) {
      this.formData.append('fileCollection', uploadImage, uploadImage.name);
    }
    this.formData.append('Name', this.loginForm.controls['name'].value);
    this.formData.append('Rating', '0');
    this.formData.append('Price', this.loginForm.controls['price'].value);
    this.formData.append('Category_Id',this.loginForm.controls['category'].value);
    this.formData.append('Description', this.description);
    this.formData.append('Quantity_limit', this.loginForm.controls['quantity_limit'].value);
    // this.formData.append('Departure_Time', this.loginForm.controls['departure_Time'].value);
    this.formData.append('Range_time', this.loginForm.controls['range_time'].value);
    this.formData.append('Transportation_ID', this.loginForm.controls['transportation'].value);
    this.formData.append('Discount', this.loginForm.controls['discount'].value);
    this.formData.append('Departure_location', this.loginForm.controls['departure_location'].value);
    // console.log(this.formData);

    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['price'].errors &&
      !this.loginForm.controls['category'].errors &&
      !this.loginForm.controls['quantity_limit'].errors &&
      !this.loginForm.controls['description'].errors &&
      // !this.loginForm.controls['departure_Time'].errors&&
      !this.loginForm.controls['range_time'].errors&&
      !this.loginForm.controls['transportation'].errors&&
      !this.loginForm.controls['discount'].errors&&
      !this.loginForm.controls['departure_location'].errors
    ) {
      this.tourService.createTours(this.formData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Create success', 'Success');
          this.router.navigate(['/admin/tours'], {
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
  public getListCategory = () => {
    this.categoryService.getListCategories().subscribe((val: any) => {
      this.category = val;
    });
  };
  public getListTransportation = () => {
    this.transportationService.getListTransportation().subscribe((val: any) => {
      this.transportation = val;
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
