import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFormService } from '../../../../services/validator-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent, FileUploadErrorEvent } from 'primeng/fileupload';
import { SnackbarService } from '../../../../services/snackbar.service';
import { LocationService } from '../../../../services/location.service';
import { Location } from '../../../../models/location.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss'],
})
export class CreateStaffComponent implements OnInit {
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
    private staffService: StaffService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.staffService.staffsSubject.subscribe(
      (val: any) => (this.hotels = val?.data)
    );

    // Get list locations
    // this.getListLocations();

    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      email: [
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
      personid: [
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
    this.formData.append('Phone', this.loginForm.controls['phone'].value);
    this.formData.append(
      'Email',
      this.loginForm.controls['email'].value
    );
    this.formData.append('PersonId', this.loginForm.controls['personid'].value);

    this.dataForm = {
      Name: this.loginForm.controls['name'].value,
      Phone: this.loginForm.controls['phone'].value,
      Email: this.loginForm.controls['email'].value,
      PersonId: this.loginForm.controls['personid'].value,
      fileCollection: this.uploadedImages,
    };

    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['phone'].errors &&
      !this.loginForm.controls['email'].errors &&
      !this.loginForm.controls['personid'].errors 
    ) {
      this.staffService.createStaff(this.formData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Create success', 'Success');
          this.router.navigate(['/admin/staffs'], {
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
  // public getListLocations = () => {
  //   this.locationService.getListLocation().subscribe((val: any) => {
  //     this.locations = val;
  //   });
  // };

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

