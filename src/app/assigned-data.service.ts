import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

//import { Mission } from './mission';
import { Scout } from './scout';

@Injectable({
  providedIn: 'root'
})

export class AssignedDataService {

  scoutMissions: any[] = [];
  constructor() { }

  add(mission, scoutID: number): Observable<Scout[]>{
    //console.log(this.scoutMissions, mission);
    return of(this.scoutMissions.filter(e => {
      if(e.id === scoutID){
        e.missions.push(mission.title);
      }
    }));
  }
}