import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreviousRouteServiceService } from 'src/app/services/previous-route-service.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  username: string = '';
  confirmCode: string = '';
  isConfirmCode: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: SnackbarService,
    private router: Router,
    private previousRouteService: PreviousRouteServiceService
  ) {}

  ngOnInit(): void {}

  public send = () => {
    const data = {
      username: this.username,
    };

    this.authService.SendForgotPasswordEmail(data).subscribe(
      (val) => {
        console.log(val);
        this.snackBar.openSnackBar(val.message, 'Success');
        this.isConfirmCode = true;
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(err, 'Error');
      }
    );
  };

  public continue = () => {
    const data = {
      code: this.confirmCode,
      username: this.username,
    };

    const query = {
      username: this.username,
    };

    this.authService.verifyCodeResetPassword(data).subscribe(
      (val) => {
        if (val.message === 'Comfirm successfully') {
          const currentUrl = this.router.url;
          this.previousRouteService.setPreviousRoute(currentUrl);
          this.snackBar.openSnackBar(val.message, 'Success');
          this.router.navigate(['/auth/reset-password'], {
            queryParams: query,
          });
        }
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(err, 'Error');
      }
    );
  };
}
