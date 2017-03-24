import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Station, StationService } from './station.service';

@Injectable()
export class StationResolver implements Resolve<any> {
  constructor(private ss: StationService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.ss.getStations();
  }
}