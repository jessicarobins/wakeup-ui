import { Component, OnInit, ViewChild,
  trigger, state, animate, transition, style } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';

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
      transition('* => *', [
        style({transform: 'scale(0)'}),
        animate(500, style({transform: 'scale(1)'})) 
      ])
    ])
  ]
})
export class StationPageComponent implements OnInit {

  stations: Station[]
  station: Station
  stationData: Station
  dataService: CompleterData
  
  @ViewChild("completer") private completer: CompleterCmp;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ss: StationService,
    private completerService: CompleterService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { stations: Station[] }) => {
        this.stations = data.stations
        this.dataService = this.completerService.local(this.stations, 'name', 'name')
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
  
  public onOpen() {
      this.completer.open('');
  }

  public onClose() {
      this.completer.close();
  }
}
