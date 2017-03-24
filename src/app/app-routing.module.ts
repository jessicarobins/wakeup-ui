import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationPageComponent } from './station-page/station-page.component';

const routes: Routes = [
  {
    path: '',
    component: StationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
