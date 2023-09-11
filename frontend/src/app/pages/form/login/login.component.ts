import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../model/user';
import { ValidatorFormService } from '../../../services/validator-form.service';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  errorMessage: string = '';
  loginForm!: FormGroup;
  userLogin!: User;
  user!: User;

  constructor(
    private matDialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}

  ngOnInit(): void {
    // Create formgroup and form control
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      password: [
        '',
        Validators.compose([this.validatorForm.NoWhitespaceValidator()]),
      ],
      // rememberMe: false,
    });
  }

  onClose = (): void => {
    this.matDialogRef.close();
  };

  isShowPassword = (): void => {
    this.hide = !this.hide;
  };

  // OnSubmit
  onSubmit = () => {
    this.userLogin = {
      userInfo: {
        username: this.loginForm.controls['username']?.value,
        password: this.loginForm.controls['password']?.value,
      },
    };

    if (
      !this.loginForm.controls['username'].errors &&
      !this.loginForm.controls['password'].errors
    ) {
      this.authService.Login(this.userLogin).subscribe(
        (data: any) => {
          if (data?.token) {
            this.tokenStorage.saveToken(data?.token);
            this.tokenStorage.saveUser(data?.userInfo);
            this.errorMessage = '';
            this.user = data?.userInfo;
            this.authService.startRefreshTokenTimer();
            this.matDialogRef.close({ data: this.user });
          }
        },
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        },
      );
    }
  };
}
