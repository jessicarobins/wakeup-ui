export class Station {
  constructor(
    public id: number,
    public name: string,
    public cabi_id: number,
    public short_name: string,
    public region_id: number,
    public capacity: number,
    public latitude: number,
    public longitude: number,
    public median_last_bike: string,
    public route_name: string) {}
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StationService {
  
  constructor (private http: Http) {}
  
  private url = 'https://cabi-wakeup-api.herokuapp.com/stations';
  
  getStations() : Observable<any> { 
    return this.http.get(this.url)
      .map(response => response.json() as Station[]);
  }
  
  getStation(route: string): Promise<Station> {
    return this.http.get(`${this.url}/${route}/show_by_route_name`)
      .toPromise()
      .then(response => response.json() as Station)
  }

}