import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-update-cate',
  templateUrl: './update-cate.component.html',
  styleUrls: ['./update-cate.component.scss']
})
export class UpdateCateComponent implements OnInit {
  formData: FormData = new FormData();
  loginForm!: FormGroup;
  Editor = ClassicEditor;
  category!: Category;
  id!: number;


  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public snackBar: SnackbarService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));


    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],

    });

    this.categoryService.categorySubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);
    });
  }

  onSubmit = async () => {


    const categoryData = {
      id: this.id,
      name: this.loginForm.controls['name'].value
    }


    if (
      !this.loginForm.controls['name'].errors

    ) {
      this.categoryService.updateCategory(categoryData).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Create success', 'Success');
          this.router.navigate(['/admin/categories'], {
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
