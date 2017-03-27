import { Component, OnInit,
  trigger, state, animate, transition, style } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

import * as moment from 'moment'

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
  showStationDetails: boolean
  graphOptions: any
  
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
        this.showStationDetails = false;
      });
      
    this.graphOptions = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        yAxes: [{
          ticks: {
            callback:(v)=>this.formatSecsAsMins(v),
            stepSize: 300, //add a tick every 5 minutes
          }
        }]
      },
    }
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
    this.showStationDetails = false
    this.location.replaceState('/')
  }
  
  toggleStationDetails() {
    this.showStationDetails = !this.showStationDetails
  }
  
  selectAllContent($event) {
    $event.target.select();
  }
  
  formattedStatistics() {
    return {
      median: `${this.stationData.statistics.median} AM`,
      mean: `${this.stationData.statistics.mean} AM`,
      'standard deviation': `${this.stationData.statistics.standard_deviation} minutes`,
      range: `${this.stationData.statistics.range} minutes`,
      q1: `${this.stationData.statistics.q1} AM`,
      q3: `${this.stationData.statistics.q3} AM`,
      min: `${this.stationData.statistics.min} AM`,
      max: `${this.stationData.statistics.max} AM`,
      outliers: this.stationData.statistics.outliers.length ? this.stationData.statistics.outliers.map((o) => {
        return `${o} AM`
      }) : 'none'
    }
  }
  
  parseGraphData() {
    return this.stationData.last_bike_times.map(t => {
      const parts = t.split('T')
      const date = parts[0]
      const time = moment(parts[1], "HH:mm").unix()
      return {
        date: date,
        time: time
      }
    })
  }
  
  graphData() {
    return this.parseGraphData().map(d => d.time)
  }
  
  graphLabels() {
    return this.parseGraphData().map(d => d.date)
  }
  
  formatSecsAsMins(t) {
    return moment.unix(t).format("h:mm")
  }
}
