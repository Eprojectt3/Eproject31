import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material angular
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

// Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

// PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { appInitializer } from './helpers/app.initializer';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/interceptor/auth.interceptor';
import { LoadingInterceptor } from './helpers/interceptor/loading.interceptor';
import { ErrorInterceptor } from './helpers/interceptor/error.interceptor';
import { UserModule } from './pages/user/user.module';
import { AuthModule } from './pages/auth/auth.module';
import { AdminModule } from './pages/admin/admin.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarComponent,
    LoadingComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatDialogModule,
    MatCardModule,
    CarouselModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    UserModule,
    AuthModule,
    AdminModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
