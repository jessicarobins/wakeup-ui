import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ChartsModule } from 'ng2-charts'

import 'chart.js'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationPageComponent } from './station-page/station-page.component';

import { StationResolver, StationsResolver } from './station-page/station-resolver.service'
import { StationService } from './station-page/station.service';
import { KeysPipe } from './keys.pipe'

@NgModule({
  declarations: [
    AppComponent,
    StationPageComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2AutoCompleteModule,
    ChartsModule
  ],
  providers: [
    StationResolver,
    StationsResolver,
    StationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
