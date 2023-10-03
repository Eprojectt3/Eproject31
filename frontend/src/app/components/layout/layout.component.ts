import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.titleValue = this.titleService.$titleSubject;

    this.$isLogin = this.authService.$isLoggedInSubject;
    this.$isLogin.subscribe((val) => {
      this.isLogin = val;
    });
    this.userInfo = this.tokenStorage.getUser();
    console.log(this.isLogin);
  }

  public logout = (): void => {
    this.authService.logout();
    this.$isLogin = this.authService.$isLoggedInSubject;
    this.$isLogin.subscribe((val) => {
      this.isLogin = val;
    });
  };
}
