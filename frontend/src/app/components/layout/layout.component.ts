import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { TitleService } from 'src/app/services/title.service';

const dialogConfigsLogin = {
  disableClose: true,
  closeOnNavigation: true,
  width: '450px',
  height: '480px',
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
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  urlImage: string = 'url(../../../assets/images/cat-ba-3553145_1920 1.jpg)';
  userInfo: User | undefined;
  isLogin: boolean = false;
  titleValue!: Observable<string | null>;

  constructor(private titleService: TitleService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.titleValue = this.titleService.$titleSubject;
  }

  openDialogLogin = (): void => {
    const dialogRef = this.dialog.open(LoginComponent, dialogConfigsLogin);

    dialogRef.afterClosed().subscribe((rs) => {
      this.userInfo = rs?.data;
    });
  };

  // openDialogRegister = (): void => {
  //   this.dialog.open(RegisterComponent, dialogConfigsRegister);
  // };
}
