import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { ValidatorFormService } from 'src/app/services/validator-form.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  form!: FormGroup;
  user!: any;
  isLogin: boolean = false;
  $isLogin!: Observable<boolean | false>;

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorFormService,
    private tokenStorageService: TokenStorageService,
    private userService: UsersService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // implements form reactive
    this.form = this.fb.group({
      name: ['', Validators.compose([this.validator.NoWhitespaceValidator()])],
      username: [
        '',
        Validators.compose([this.validator.NoWhitespaceValidator()]),
      ],
      email: ['', Validators.compose([this.validator.NoWhitespaceValidator()])],
      phone: [
        '',
        Validators.compose([
          this.validator.NoWhitespaceValidator(),
          Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
        ]),
      ],
    });

    // Get user
    this.user = this.tokenStorageService.getUser();

    // Set value for form
    this.form.controls['name'].setValue(this.user.name);
    this.form.controls['username'].setValue(this.user.username);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['phone'].setValue(this.user.phone);
  }

  // On submit
  public onSubmit = () => {
    const data = {
      id: this.tokenStorageService.getUser().id,
      name: this.form.controls['name'].value,
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
    };

    this.userService.updateUser(data).subscribe(
      (vals: any) => {
        this.snackbarService.openSnackBar('Update successfully', 'Success');
        this.authService.logout();
        this.$isLogin = this.authService.$isLoggedInSubject;
        this.$isLogin.subscribe((val) => {
          this.isLogin = val;
        });

        location.reload();
      },
      (err) => {
        this.snackbarService.openSnackBar(err, 'Error');
      },
    );
  };

  // Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      height: 'auto',
    });
  }
}
