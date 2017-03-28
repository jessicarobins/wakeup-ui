import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2'

import { NavbarComponent } from './navbar/navbar.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
  title = "when's the last bike at";
}
