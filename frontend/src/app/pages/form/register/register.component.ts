import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { role, Role } from '../../../model/role';
import { ValidatorFormService } from '../../../services/validator-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide: boolean = true;
  matFormField!: MatFormField;
  loginForm!: FormGroup;
  hideConfirm: boolean = true;
  roles: Role[] = role;
  selected!: number;

  constructor(
    private matDialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
  ) {}

  ngOnInit(): void {
    // Create formgroup and form control
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      email: [
        '',
        Validators.compose([
          this.validatorForm.NoWhitespaceValidator(),
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          this.validatorForm.NoWhitespaceValidator(),
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$',
          ),
        ]),
      ],

      confirmPassword: [
        '',
        Validators.compose([
          this.validatorForm.NoWhitespaceValidator(),
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$',
          ),
        ]),
      ],
      roleId: [null, Validators.required],
    });
  }

  onClose = (): void => {
    this.matDialogRef.close();
  };

  isShowPassword = (): void => {
    this.hide = !this.hide;
  };

  isShowConfirmPassword = (): void => {
    this.hideConfirm = !this.hideConfirm;
  };

  // OnSubmit
  onSubmit = () => {
    // console.log(this.loginForm.controls['username'].invalid);
  };
}
