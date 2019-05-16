import { Component, OnInit } from '@angular/core';

import { Mission } from '../mission';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})

export class MissionsComponent implements OnInit {

  missionsTitle: string = 'Missions';
  assignAll: Assign[];
  missions: Mission[];

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getMissions();
  }

  getMissions():void {
    this.data.getMissions().subscribe(data =>{
      if(this.data.assignDB.length === 0) this.populateAssignDB(data['results']);
      this.missions = data['results'].map((e:any, i:number) => {
        const idx = this.data.assignDB[i].scout_id;
        return this.addScoutName({...e, scout: '-' }, e.id, idx);
      });
    });
  }

  addScoutName(missionsObj:any, missionId:number, scoutId:number){
    if(scoutId) this.data.getAssignByMission(missionId).subscribe(data => {
      missionsObj.scout = data.name;
    });
    return missionsObj;
  }

   populateAssignDB(data:any):void {
    data.map((e:any, i:number) => this.data.addAssignDB(i, 0, e.id));
  }
}