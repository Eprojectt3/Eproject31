import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { Role } from './models/role.model';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { SearchResultHotelComponent } from './components/search/search-result/search-result-hotel/search-result-hotel.component';
import { SearchResultResortComponent } from './components/search/search-result/search-result-resort/search-result-resort.component';
import { SearchResultRestaurantComponent } from './components/search/search-result/search-result-restaurant/search-result-restaurant.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
    children: [
      {
        path: 'hotels',
        component: SearchResultHotelComponent,
      },
      {
        path: 'resorts',
        component: SearchResultResortComponent,
      },
      {
        path: 'restaurants',
        component: SearchResultRestaurantComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
