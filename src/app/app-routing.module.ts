import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationPageComponent } from './station-page/station-page.component';

import { StationResolver } from './station-page/station-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: StationPageComponent,
    resolve: {
      stations: StationResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
