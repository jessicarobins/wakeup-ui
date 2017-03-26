import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Station, StationService } from './station.service';

@Injectable()
export class StationsResolver implements Resolve<any> {
  constructor(private ss: StationService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.ss.getStations();
  }
}

@Injectable()
export class StationResolver implements Resolve<any> {
  constructor(private ss: StationService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Station> {
    let id = route.params['id']
    
    return this.ss.getStation(id).then(station => {
      if (station) {
        return station;
      } else { // id not found
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}