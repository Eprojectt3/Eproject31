import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ListUsersComponent } from './admin-user/list-users/list-users.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AdminComponent, ListUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
