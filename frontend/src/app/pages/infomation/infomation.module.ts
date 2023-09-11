import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfomationRoutingModule } from './infomation-routing.module';
import { InfomationComponent } from './infomation.component';

// Material angular
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { AppModule } from 'src/app/app.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [InfomationComponent],
  imports: [
    MatButtonModule,
    CommonModule,
    InfomationRoutingModule,
    MatCardModule,
    MatIconModule,
    CarouselModule,
    CardModule,
    PipeModule,
  ],
})
export class InfomationModule {}
