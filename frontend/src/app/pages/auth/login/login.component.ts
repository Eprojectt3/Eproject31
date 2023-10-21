import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TitleService } from 'src/app/services/title.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  errorMessage: string = '';
  loginForm!: FormGroup;
  userLogin!: User;
  user!: User;

  constructor(
    private fb: FormBuilder,
    public validatorForm: ValidatorFormService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackBarService: SnackbarService,
    private titleService: TitleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // set title
    this.titleService.setTitleValue('Login');

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
            this.location.back();
          }
        },
        (err: any) => {
          this.errorMessage = err?.error?.message;

          console.log(this.errorMessage);
          this.snackBarService.openSnackBar(this.errorMessage, 'Error');
        }
      );
    }
  };
}
