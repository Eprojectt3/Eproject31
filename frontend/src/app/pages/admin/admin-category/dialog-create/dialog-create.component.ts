import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
})
export class DialogCreateComponent implements OnInit {
  loginForm!: FormGroup;
  category!: Category;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    public categoryService: CategoryService,
    public snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
  }

  public onSubmit = () => {
    this.category = {
      name: this.loginForm.controls['name'].value,
    };

    if (!this.loginForm.controls['name'].errors) {
      this.categoryService
        .createCategory(this.category.name)
        .subscribe((val: any) => {
          this.snackBarService.openSnackBar('Create successfully', 'Success');
          this.errorMessage = '';
          this.dialogRef.close('success');
        }),
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        };
    }
  };
}
