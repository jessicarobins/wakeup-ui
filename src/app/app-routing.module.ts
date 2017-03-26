import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationPageComponent } from './station-page/station-page.component';

import { StationsResolver, StationResolver } from './station-page/station-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: StationPageComponent,
    resolve: {
      stations: StationsResolver
    }
  },
  {
    path: ':id',
    component: StationPageComponent,
    resolve: {
      station: StationResolver,
      stations: StationsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
