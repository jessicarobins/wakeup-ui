import { Component, OnInit,
  trigger, state, animate, transition, style } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

import { Station, StationService } from './station.service'

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrls: ['./station-page.component.css'],
  animations: [
    trigger('stationFormSize', [
      state('true', style({
        flex: '.4',
      })),
      state('false',   style({
        flex: '1'
      })),
      transition('* => *', animate('.5s'))
    ]),
    trigger('stationTitleSize', [
      state('false', style({
        transform: 'scale(1)',
      })),
      state('true',   style({
        transform: 'scale(.5)',
      })),
      transition('* => *', animate('.5s'))
    ]),
    trigger('stationTimeSize', [
      state('false', style({
        flex: '.0001',
      })),
      state('true',   style({
        flex: '.7'
      })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class StationPageComponent implements OnInit {

  stations: Station[]
  station: Station
  stationData: Station
  isLoadingStationData: boolean
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ss: StationService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { stations: Station[], station: Station }) => {
        this.stations = data.stations
        this.station = this.stationData = data.station
        this.isLoadingStationData = false;
      });
  }
  
  changeStation() {
    this.isLoadingStationData = true
    this.ss.getStation(this.station.route_name)
      .then((data) => {
        this.stationData = data
        this.isLoadingStationData = false
      })
    this.location.replaceState(this.station.route_name)
  }
  
  time() {
    if (this.stationData) {
      return this.stationData.statistics.mean ? 
        `${this.stationData.statistics.mean} AM`
        : 'No data'
    }
  }
  
  removeStation() {
    this.station = null
    this.stationData = null
    this.location.replaceState('/')
  }
}
