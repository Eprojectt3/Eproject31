import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  hide: boolean = true;
  user: any;

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorFormService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      old_password: [
        '',
        Validators.compose([this.validator.NoWhitespaceValidator()]),
      ],
      new_password: [
        '',
        Validators.compose([
          this.validator.NoWhitespaceValidator(),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$'
          ),
        ]),
      ],
      confirm_password: [
        '',
        [this.validator.NoWhitespaceValidator(), this.matchPassword.bind(this)],
      ],
    });

    // Get user
    this.user = this.tokenStorage.getUser();
  }

  // On submit
  public onSubmit = () => {
    const data = {
      Username: this.user.username,
      OldPassword: this.form.controls['old_password'].value,
      NewPassword: this.form.controls['new_password'].value,
    };

    if (
      !this.form.controls['old_password'].errors &&
      !this.form.controls['new_password'].errors &&
      !this.form.controls['confirm_password'].errors
    ) {
      this.authService.changePassword(data).subscribe(
        (val) => {
          this.snackBarService.openSnackBar('Change password Successfully');
          this.authService.logout();
          location.reload();
        },
        (err) => {
          console.error(err);
          this.snackBarService.openSnackBar(err, 'Error');
        }
      );
    }
  };

  // Check confirm password and new password
  matchPassword = (control: FormControl) => {
    const newPassword = this.form?.get('new_password')?.value;
    const confirmPassword = control.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  isShowPassword = (): void => {
    this.hide = !this.hide;
  };
}
