import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileSelectEvent } from 'primeng/fileupload';
import { Staff } from 'src/app/models/staff.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StaffService } from 'src/app/services/staff.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit {
  formData: FormData = new FormData();
  loginForm!: FormGroup;
  Editor = ClassicEditor;
  description!: any;
  uploadedImages: File[] = [];
  staff!: Staff;
  id!: number;
  location!: any;
  staffDetail!: any;
  urlImages: any = [];
  pathImages: any = [];

  constructor(
    private staffService: StaffService,
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public snackBar: SnackbarService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Hotel

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.staffService.getDetailStaff(this.id).subscribe((val: any) => {
      this.staff = val;
      this.formData.append('Id', val.id);
    });

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

    this.staffService.staffsSubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);
      this.loginForm.controls['email'].setValue(val.email);
      this.loginForm.controls['phone'].setValue(val.phone);
      this.loginForm.controls['personid'].setValue(val.personId);

      for (let Image of val.urlImage) {
        this.urlImages.push(Image);
        this.pathImages.push(Image.path);
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
    this.formData.append('Phone', this.loginForm.controls['phone'].value);
    this.formData.append(
      'Email',
      this.loginForm.controls['email'].value
    );
    this.formData.append('PersonId', this.loginForm.controls['personid'].value);

    if (
      !this.loginForm.controls['name'].errors &&
      !this.loginForm.controls['phone'].errors &&
      !this.loginForm.controls['email'].errors &&
      !this.loginForm.controls['personid'].errors 
    ) {
      this.staffService.updateStaff(this.formData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Update success', 'Success');
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
