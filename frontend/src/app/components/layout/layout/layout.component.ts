import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { LoginComponent } from 'src/app/pages/form/login/login.component';
import { RegisterComponent } from 'src/app/pages/form/register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

// Login and Register config dialog
const dialogConfigsLogin = {
  disableClose: true,
  closeOnNavigation: true,
  width: '450px',
  height: '420px',
};

const dialogConfigsRegister = {
  disableClose: true,
  closeOnNavigation: true,
  width: '450px',
  height: '630px',
  data: '',
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  userInfo: User | undefined;
  isLogin: boolean = false;

  constructor(
    public dialog: MatDialog,
    public tokenStorage: TokenStorageService,
    public authService: AuthService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.authService.$isLoggedInSubject.subscribe((data: boolean) => {
      this.isLogin = data;
    });
  }

  openDialogLogin = (): void => {
    const dialogRef = this.dialog.open(LoginComponent, dialogConfigsLogin);

    dialogRef.afterClosed().subscribe((rs) => {
      // this.userInfo = rs?.data;
    });
  };

  openDialogRegister = (): void => {
    this.dialog.open(RegisterComponent, dialogConfigsRegister);
  };

  isLogout = () => {
    this.authService.logout();
  };

  ngOnDestroy(): void {
    this.authService.$isLoggedInSubject.unsubscribe();
  }
}
