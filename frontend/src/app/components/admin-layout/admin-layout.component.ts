import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tour, tours } from 'src/app/models/tour';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  tour: Tour[] = tours;
  $isLogin!: Observable<boolean | false>;
  isLogin: boolean = false;
  userInfo!: any;
  @Input() sidenav: any;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.$isLogin = this.authService.$isLoggedInSubject;
    this.$isLogin.subscribe((val) => (this.isLogin = val));
    this.userInfo = this.tokenStorage.getUser();
    console.log(this.sidenav);
  }

  public logout = (): void => {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  };
}
