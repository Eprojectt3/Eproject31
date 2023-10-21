import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  urlImage: string = 'url(../../../assets/images/cat-ba-3553145_1920 1.jpg)';
  userInfo!: any;
  $isLogin!: Observable<boolean | false>;
  titleValue!: Observable<string | null>;
  isLogin: boolean = false;
  isShowSearch: boolean = false;

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.titleValue = this.titleService.$titleSubject;

    this.$isLogin = this.authService.$isLoggedInSubject;
    this.$isLogin.subscribe((val) => {
      this.isLogin = val;
    });
    this.userInfo = this.tokenStorage.getUser();
  }

  public logout = (): void => {
    this.authService.logout();
    this.$isLogin = this.authService.$isLoggedInSubject;
    this.$isLogin.subscribe((val) => {
      this.isLogin = val;
    });

    location.reload();
  };

  // Is Show search
  public isShowSearchComponent = (): boolean => {
    const currentUrl = this.router.url;

    if (
      currentUrl.includes('/user/infomation') ||
      currentUrl.includes('/user/infomation/tours') ||
      currentUrl.includes('/user/infomation/hotels') ||
      currentUrl.includes('/user/infomation/resorts') ||
      currentUrl.includes('/user/infomation/restaurants')
    ) {
      return true;
    }

    return false;
  };

  // Open search Dialog
  public openSearchDialog = () => {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: '700px',
      height: 'auto',
    });
  };
}
