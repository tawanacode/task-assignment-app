import { Component, OnInit } from '@angular/core';

import { Mission } from '../mission';
import { Scout } from '../scout';
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
  scouts: Scout[];
  scout: Scout = new Scout(0, 'none', 'user@test.com', 0);
  scoutId: number;
  scoutName: string;

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data => this.scouts = data);
    this.getMissions();
    //this.getScout();
  }

  getMissions():void {
    this.data.getMissions().subscribe(data =>{
     // this.missions = data['results'];
      if(this.data.assignDB.length === 0) this.populateAssignDB(data['results']);
      this.missions = data['results'].map(e => {
        this.getScout(e.id);
        return  e = {...e, scout :  this.scout.name };
      });

      console.log(this.missions);
    });
  }

  getScout(id):void{
    this.data.getAssignByMission(id).subscribe(e => this.scoutId = e.scout_id);
    console.log('from get scout', this.scoutId)
    if(this.scoutId) this.data.getScout(this.scoutId).subscribe(data => {
      this.scout = data;
    console.log('from namae', this.scout.name);
    });
  }

   populateAssignDB(data):void {
    data.map((e, i) => this.data.addAssignDB(i, 0, e.id));
  }
}