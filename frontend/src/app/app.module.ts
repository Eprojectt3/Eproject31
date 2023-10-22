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
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

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
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { InterceptorModule } from './interceptor.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LayoutOrderComponent } from './components/layout-order/layout-order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';
import { SearchTourComponent } from './components/search/search-tour/search-tour.component';
import { SearchHotelComponent } from './components/search/search-hotel/search-hotel.component';
import { SearchRestaurantComponent } from './components/search/search-restaurant/search-restaurant.component';
import { SearchResortComponent } from './components/search/search-resort/search-resort.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { SearchResultHotelComponent } from './components/search/search-result/search-result-hotel/search-result-hotel.component';
import { SearchResultResortComponent } from './components/search/search-result/search-result-resort/search-result-resort.component';
import { SearchResultRestaurantComponent } from './components/search/search-result/search-result-restaurant/search-result-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarComponent,
    LoadingComponent,
    AdminLayoutComponent,
    LayoutComponent,
    FooterComponent,
    LayoutOrderComponent,
    NotFoundComponent,
    SearchComponent,
    SearchTourComponent,
    SearchHotelComponent,
    SearchRestaurantComponent,
    SearchResortComponent,
    SearchResultComponent,
    SearchResultHotelComponent,
    SearchResultResortComponent,
    SearchResultRestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InterceptorModule,
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
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    CKEditorModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoadingInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
