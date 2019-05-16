import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})

export class MissionComponent implements OnInit {
  assign: Assign;
  assignAll: Assign[];
  mission: Mission;
  scouts: Scout[] = [];
  scout_id: number = 0;
  scout: Scout = new Scout(this.scout_id, '-', 'info@scout.co.za', 0);
  submitted = false;
  selectedScout: string = 'none';

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.data.getScouts().subscribe(data => this.scouts = data);
    this.getMission();
    }

  getMission(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getMission(id).subscribe(data => {
      this.mission = data;
    });
    this.data.getAssignDB().subscribe(data => {
      data.filter(e => e.mission_id === id).map(e => this.assign = e);
    });
    this.getScoutName(id, this.assign.scout_id)
  }

  getScoutName(missionId:number, scoutId:number):void{
    if(scoutId) this.data.getAssignByMission(missionId).subscribe(data => {
      this.scout = data;
      console.log(this.scout.name);
    });
  }

  onSelect(e): void {
    e.preventDefault;
    this.scout_id = +e.target.selectedOptions[0].title;
    console.log('selected scout is', this.scout_id)
    this.data.getScout(this.scout_id).subscribe(data => this.scout = data);
   }

  goBack():void{
    this.location.back();
  }
  save():void {  
    console.log(this.mission.id, this.scout_id)
    this.data.updateAssignDB(this.scout_id, this.mission.id).subscribe();
    this.submitted;
  }
}
