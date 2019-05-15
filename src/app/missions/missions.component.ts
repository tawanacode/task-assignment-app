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
    //let scout = this.scout;
    this.data.getMissions().subscribe(data =>{
      this.missions = data['results'];
    //.map(e => {
    //     console.log(e)
    //   this.getMissId(e.id);
    //   this.data.getScout(this.scoutId).subscribe(data =>{
    //     this.scout = data;});
    //    return {...e, scout};
    // });
    // console.log(this.missions);
    // this.data.getAssignDB().subscribe(data => {
    //   this.assignAll = data;
    // });
  })
}

  getMissId(id):void{
    this.data.getAssignByMission(id).subscribe(e => {
      console.log(e)
      this.scoutId = e.scout_id;
    });
  }
   getScout(id):void {
     //if(!id) return;
     this.data.getScout(id).subscribe(data =>{
     this.scout = data;
     console.log('this is scout',this.scout)}
   )}
}