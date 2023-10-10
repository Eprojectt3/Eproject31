import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AdminSidebar, adminSidebar } from './models/admin-sidebar.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Eproject3';
  $url!: Observable<string | null>;
  url!: string | null;
  adminSidebars: AdminSidebar[] = adminSidebar;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public isShowUserLayout = (): boolean => {
    const currentUrl = this.router.url;

    return currentUrl.includes('/user/');
  };

  public isShowLogin = (): boolean => {
    const currentUrl = this.router.url;

    return currentUrl.includes('/auth/login');
  };

  public isShowAdmin = (): boolean => {
    const currentUrl = this.router.url;

    return currentUrl.includes('/admin');
  };

  public isShowLayoutOrder = (): boolean => {
    const currentUrl = this.router.url;

    return currentUrl.includes('/user/order');
  };
}
