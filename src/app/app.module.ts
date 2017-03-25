import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2CompleterModule } from 'ng2-completer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationPageComponent } from './station-page/station-page.component';

import { StationResolver } from './station-page/station-resolver.service'
import { StationService } from './station-page/station.service'

@NgModule({
  declarations: [
    AppComponent,
    StationPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2CompleterModule
  ],
  providers: [
    StationResolver,
    StationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
