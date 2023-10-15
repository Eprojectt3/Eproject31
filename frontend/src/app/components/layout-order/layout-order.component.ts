import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-layout-order',
  templateUrl: './layout-order.component.html',
  styleUrls: ['./layout-order.component.scss'],
})
export class LayoutOrderComponent implements OnInit {
  userInfo!: any;
  $isLogin!: Observable<boolean | false>;
  titleValue!: Observable<string | null>;
  isLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
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
}
