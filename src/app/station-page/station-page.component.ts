import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'

import { Station, StationService } from './station.service'

@Component({
  selector: 'app-station-page',
  templateUrl: './station-page.component.html',
  styleUrls: ['./station-page.component.css']
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
    return `${moment(this.stationData.median_last_bike, "Hmmss")
      .format("k:mm")} AM`
  }
}
