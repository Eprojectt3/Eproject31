import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Role, Role1 } from 'src/app/models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { PreviousRouteServiceService } from 'src/app/services/previous-route-service.service';
import { RoleService } from 'src/app/services/role.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  role: any;
  hide: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorService: ValidatorFormService,
    private roleService: RoleService,
    private snackBar: SnackbarService,
    private router: Router,
    private previousRouteService: PreviousRouteServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([this.validatorService.NoWhitespaceValidator()]),
      ],
      name: [
        '',
        Validators.compose([this.validatorService.NoWhitespaceValidator()]),
      ],
      password: [
        '',
        Validators.compose([
          this.validatorService.NoWhitespaceValidator(),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$'
          ),
        ]),
      ],

      confirmPassword: [
        '',
        [
          this.validatorService.NoWhitespaceValidator(),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$'
          ),
          this.matchPassword.bind(this),
        ],
      ],
      email: [
        '',
        Validators.compose([
          this.validatorService.NoWhitespaceValidator(),
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
      ],
      phone: [
        '',
        Validators.compose([
          this.validatorService.NoWhitespaceValidator(),
          Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        ]),
      ],
    });

    // Get role
    this.roleService.getListRole().subscribe((res: Role1[]) => {
      this.role = res.find((item: Role1) => {
        return item?.name === 'User';
      });
    });
  }

  // Check confirm password and new password
  public matchPassword = (control: FormControl) => {
    const newPassword = this.form?.get('password')?.value;
    const confirmPassword = control.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  // Submit
  public onSubmit = () => {
    console.log(this.form.get('username')?.value);

    const data = {
      username: this.form.get('username')?.value,
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      roleId: this.role.id,
    };

    if (
      !this.form.get('username')?.errors &&
      !this.form.get('name')?.errors &&
      !this.form.get('password')?.errors &&
      !this.form.get('email')?.errors &&
      !this.form.get('phone')?.errors &&
      !this.form.get('confirmPassword')?.errors
    ) {
      this.authService.register(data).subscribe(
        (val) => {
          this.snackBar.openSnackBar('Register successfully', 'Success');
          const currentUrl = this.router.url;
          this.previousRouteService.setPreviousRoute(currentUrl);
          this.router.navigate(['/auth/login']);
        },
        (err) => {
          console.log(err);

          this.snackBar.openSnackBar(err, 'Error');
        }
      );
    }
  };

  // Is show password
  public isShowPassword = (): void => {
    this.hide = !this.hide;
  };
}
