import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListUsersComponent } from './admin-user/list-users/list-users.component';
import { ListCategoriesComponent } from './admin-category/list-categories/list-categories.component';
import { ListToursComponent } from './admin-tour/list-tours/list-tours.component';

const routes: Routes = [
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: 'categories',
    component: ListCategoriesComponent,
  },
  { path: '', component: AdminComponent, pathMatch: 'full' },
  {
    path: 'categories',
    component: ListCategoriesComponent,
  },
  {
    path: 'tours',
    component: ListToursComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
