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
  mission: Mission;
  scout: Scout = new Scout(0, 'none', 'none@test.com', 0);
  scouts: Scout[] = [];
  scout_id: number;
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
    this.data.getMission(id).subscribe(data => this.mission = data);
    this.data.getAssignByMission(id).subscribe(data => {
      this.assign = data;
      this.scout_id = data.scout_id || 0;
    });
    this.data.getScout(this.scout_id).subscribe(data => this.scout = data);
  }

  onSelect(e): void {
    e.preventDefault;
    this.scout_id = +e.target.selectedOptions[0].title;
    console.log('scout is', this.scout_id)
    this.data.getScout(this.scout_id).subscribe(data => this.scout = data);
  }

  save() {  
    this.data.updateAssignDB(this.scout_id, this.mission.id).subscribe();
    this.location.back();
    //.subscribe(data => this.assign = data);
    return this.submitted;
  }
}
