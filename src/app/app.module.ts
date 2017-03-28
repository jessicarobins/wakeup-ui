import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ChartsModule } from 'ng2-charts'
import 'chart.js'
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationPageComponent } from './station-page/station-page.component';

import { StationResolver, StationsResolver } from './station-page/station-resolver.service'
import { StationService } from './station-page/station.service';
import { KeysPipe } from './keys.pipe';
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    StationPageComponent,
    KeysPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2AutoCompleteModule,
    ChartsModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  providers: [
    StationResolver,
    StationsResolver,
    StationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
