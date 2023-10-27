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
  selector: 'app-update-tour',
  templateUrl: './update-tour.component.html',
  styleUrls: ['./update-tour.component.scss'],
})
export class UpdateTourComponent implements OnInit {
  loginForm!: FormGroup;
  tours!: any;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  public category!: Category[];
  public transportation!: Transportation[];
  formData: FormData = new FormData();
  dataForm: any;
  urlImages: any = [];
  pathImages: any = [];
  id!: number;

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
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.tourService.getDetailTour(this.id).subscribe((val: any) => {
      this.tours = val;
      console.log(val);

      this.formData.append('Id', val.id);
    });
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
      category: ['', Validators.required],
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
    this.tourService.toursSubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);
      this.loginForm.controls['price'].setValue(val.price);

      this.loginForm.controls['category'].setValue(val.category_id);
      this.loginForm.controls['transportation'].setValue(val.transportation_ID);
      this.loginForm.controls['description'].setValue(val.description);
      this.loginForm.controls['quantity_limit'].setValue(val.quantity_limit);
      this.loginForm.controls['range_time'].setValue(val.range_time);
      this.loginForm.controls['discount'].setValue(val.discount);
      this.loginForm.controls['departure_location'].setValue(
        val.departure_location
      );
      this.category = val.category_Id;
      this.transportation = val.transportation_ID;

      for (let urlImage of val.urlImage) {
        this.urlImages.push(urlImage);
        this.pathImages.push(urlImage.path);
      }
    });
  }
  onSubmit = async () => {
    for (const uploadImage of this.uploadedImages) {
      this.formData.append('fileCollection', uploadImage, uploadImage.name);
    }
    this.formData.append('Name', this.loginForm.controls['name'].value);
    this.formData.append('Rating', '0');
    this.formData.append('Price', this.loginForm.controls['price'].value);
    this.formData.append(
      'Category_Id',
      this.loginForm.controls['category'].value
    );
    this.formData.append('Description', this.description);
    this.formData.append(
      'Quantity_limit',
      this.loginForm.controls['quantity_limit'].value
    );
    this.formData.append(
      'Range_time',
      this.loginForm.controls['range_time'].value
    );
    this.formData.append(
      'Transportation_ID',
      this.loginForm.controls['transportation'].value
    );
    this.formData.append('Discount', this.loginForm.controls['discount'].value);
    this.formData.append(
      'Departure_location',
      this.loginForm.controls['departure_location'].value
    );

    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['price'].errors &&
      !this.loginForm.controls['category'].errors &&
      !this.loginForm.controls['quantity_limit'].errors &&
      !this.loginForm.controls['description'].errors &&
      !this.loginForm.controls['range_time'].errors &&
      !this.loginForm.controls['transportation'].errors &&
      !this.loginForm.controls['discount'].errors &&
      !this.loginForm.controls['departure_location'].errors
    ) {
      this.tourService.updateTours(this.formData).subscribe(
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

  // Upload Image
  public onSelect = ($event: FileSelectEvent) => {
    const uploadedImage: File = $event.files[0];
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const allowedExtensionName = ['.jpg', '/jpeg', '.png'];

    if (allowedTypes.includes(uploadedImage.type)) {
      allowedExtensionName.map((item) => {
        if (uploadedImage.name.includes(item)) {
          this.uploadedImages.push(uploadedImage);
        }
      });
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
