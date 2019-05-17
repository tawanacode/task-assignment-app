import { Component, OnInit } from '@angular/core';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-scouts',
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutsComponent implements OnInit {

  scoutsTitle: string = 'Scouts';
  assigned: Assign[];
  scouts: Scout[];
  missions: Mission[];

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getScouts();
  }

  getScouts():void {
    this.data.getScouts().subscribe(data => {
      this.scouts = data['results'].map((e:any, i:number) => {
        let idx;
        this.data.getAssignByScout(e.id).subscribe(e => idx = e ? e.mission_id : 0);
    // this.data.getAssignDB().subscribe(data => {
    //   idx = data.filter(e => e.scout_id === i);//.map(e => this.assign = e);
    // });
        return this.addMissions({...e, missions: [] }, idx);
      });

      
    });
  }

  addMissions(scoutObj:any, missionId:any){
    if(missionId) this.data.getMissions().subscribe(data =>{
      data['results'].filter(e => {
         if(e.id === missionId) scoutObj.missions.push(e);
        });
    });
    
    console.log(scoutObj.missions)
    return scoutObj;
  }
}