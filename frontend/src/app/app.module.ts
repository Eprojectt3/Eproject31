// Angular app
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material angular
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { appInitializer } from './helpers/app.initializer';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './helpers/interceptor/auth.interceptor';
import { LoadingInterceptor } from './helpers/interceptor/loading.interceptor';
import { ErrorInterceptor } from './helpers/interceptor/error.interceptor';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { LayoutComponent } from './components/layout/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SnackBarComponent,
    LoadingComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
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
