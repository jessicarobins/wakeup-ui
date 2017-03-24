export class Station {
  constructor(
    public id: number,
    public name: string,
    public cabi_id: number,
    public short_name: string,
    public region_id: number,
    public capacity: number,
    public latitude: number,
    public longitude: number) { }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StationService {
  
  constructor (private http: Http) {}
  
  private url = 'https://cabi-wakeup-api.herokuapp.com/stations';
  
  getStations() : Observable<any> { 
    return this.http.get(this.url)
  }

}