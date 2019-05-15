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
  scout: Scout;
  scoutId;

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getMissions();
    //this.getScout();
  }

  getMissions():void {
    let scout = this.scout;
    this.data.getMissions().subscribe(data =>{
      this.missions = data['results'];
    });
    this.missions.map(e => {
      this.getMissId(e.id)
      this.getScout(this.scoutId);
      console.log(e)
       return {...e, scout};
    });
    this.data.getAssignDB().subscribe(data => {
      this.assignAll = data;
    });
  }

  getMissId(id):void{
    this.data.getAssignByMission(id).subscribe(e => {
      this.scoutId = e.scout_id;
    });
  }
   getScout(id):void {
     //if(!id) return;
     this.data.getScout(id).subscribe(data =>{
     this.scout = data;
     console.log(this.scout)}
   )}
}