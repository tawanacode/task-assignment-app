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
  scout_id: number = 6253;
  scout: Scout = new Scout(0, 'none', 'user@test.com', 0);
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
    this.data.getAssignDB().subscribe(data => {
      this.assignAll = data;
    });
    }

  getMission(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getMission(id).subscribe(data => this.mission = data);
    this.data.getAssignByMission(id).subscribe(data => {
      this.assign = data;
      this.scout_id = data.scout_id;
      if(data.scout_id) this.getScout(data.scout_id);
   });
  }

  getScout(id): void {
   this.data.getScout(id).subscribe(data => {this.scout = data});
  }

  onSelect(e): void {
    e.preventDefault;
    this.scout_id = +e.target.selectedOptions[0].title;
    console.log('scout is', this.scout_id)
    this.data.getScout(this.scout_id).subscribe(data => this.scout = data);
   }

  goBack():void{
    this.location.back();
  }
  save():void {  
    this.data.updateAssignDB(this.scout_id, this.mission.id).subscribe();
    //.subscribe(data => this.assign = data);
    this.submitted;
  }
}
