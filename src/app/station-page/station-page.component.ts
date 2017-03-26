import { Component, OnInit,
  trigger, state, animate, transition, style } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment'

import { Station, StationService } from './station.service'

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrls: ['./station-page.component.css'],
  animations: [
    trigger('stationFormSize', [
      state('false', style({
        transform: 'scale(1)'
      })),
      state('true',   style({
        transform: 'scale(.5)'
      })),
      transition('* => *', animate('400ms ease-in-out')),
    ]),
    trigger('stationTimeSize', [
      state('false', style({
        transform: 'scale(0)'
      })),
      state('true',   style({
        transform: 'scale(1)'
      })),
      transition('* => *', animate('400ms ease-in-out'))
    ])
  ]
})
export class StationPageComponent implements OnInit {

  stations: Station[]
  station: Station
  stationData: Station
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ss: StationService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { stations: Station[] }) => {
        this.stations = data.stations
      });
  }
  
  changeStation() {
    this.ss.getStation(this.station.id)
      .then((data) => {
        this.stationData = data
      })
  }
  
  time() {
    if (this.stationData) {
      return `${moment(this.stationData.median_last_bike, "Hmmss")
        .format("k:mm")} AM`
    }
  }
  
  removeStation() {
    this.station = null
    this.stationData = null
  }
}
