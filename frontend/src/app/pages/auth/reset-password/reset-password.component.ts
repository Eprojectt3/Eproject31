import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreviousRouteServiceService } from 'src/app/services/previous-route-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  hide: boolean = true;
  user: any;

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorFormService,
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    private previousRouteService: PreviousRouteServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      new_password: [
        '',
        Validators.compose([
          this.validator.NoWhitespaceValidator(),
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\\W)|(?=.*_))^[^ ]+$'
          ),
        ]),
      ],
    });

    this.route.queryParams.subscribe((params) => {
      this.user = params['username'];
    });

    console.log(this.previousRouteService.getPreviousRoute());
    if (
      !this.previousRouteService
        .getPreviousRoute()
        .includes('/auth/forgot-password')
    ) {
      this.snackBarService.openSnackBar(
        "Can't not access to reset password page",
        'Error'
      );
      this.router.navigate(['/user/home']);
      return;
    }
  }

  // On submit
  public onSubmit = () => {
    const data = {
      password: this.form.controls['new_password'].value,
      username: this.user,
    };

    if (!this.form.controls['new_password'].errors) {
      this.authService.resetPassword(data).subscribe(
        (val) => {
          this.snackBarService.openSnackBar('Change password Successfully');
          const currentUrl = this.router.url;
          this.previousRouteService.setPreviousRoute(currentUrl);
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        },
        (err) => {
          console.error(err);
          this.snackBarService.openSnackBar(err, 'Error');
        }
      );
    }
  };

  isShowPassword = (): void => {
    this.hide = !this.hide;
  };
}
