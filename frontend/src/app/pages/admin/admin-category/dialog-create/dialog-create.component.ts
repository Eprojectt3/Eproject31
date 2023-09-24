import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
  id!: number;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    public categoryService: CategoryService,
    public snackBarService: SnackbarService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.loginForm = this.fb.group({
      name: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loginForm.patchValue(this.data)

    // this.categoryService.categorySubject.subscribe((val: any) => {
    //   this.loginForm.controls['name'].setValue(val.name);



    // });
  }

  onSubmit = async ()  => {
    const category= {
      id: this.id,
      name: this.loginForm.controls['name'].value,

    };

    if (!this.loginForm.controls['name'].errors) {
      if(this.data){
        this.categoryService
        .updateCategory(this.data.id,category)
        .subscribe({
          next:(val:any)=>{
            this.snackBarService.openSnackBar('Update successfully', 'Success');
            this.errorMessage = '';
            this.dialogRef.close('success');
          }
        }),
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        };

      }else{
        this.categoryService
        .createCategory(category.name)
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

    }
  };
}
