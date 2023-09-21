import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfomationComponent } from './infomation.component';

const routes: Routes = [{ path: '', component: InfomationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfomationRoutingModule { }
