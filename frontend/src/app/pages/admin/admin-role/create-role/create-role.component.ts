import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Role1 } from 'src/app/models/role.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';
import { DialogCreateComponent } from '../../admin-category/dialog-create/dialog-create.component';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit{
  loginForm!: FormGroup;
  role!: Role1;
  errorMessage: string = '';
  id!: number;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    public roleService: RoleService,
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

    this.roleService.roleSubject.subscribe((val: any) => {
      this.loginForm.controls['name'].setValue(val.name);



    });
  }

  onSubmit = async ()  => {
    const roles= {
      id: this.id,
      name: this.loginForm.controls['name'].value,

    };

    if (!this.loginForm.controls['name'].errors) {
      if(this.data){
        this.roleService
        .updateRole(roles,this.data.id,)
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
        this.roleService
        .createRole(roles.name)
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
