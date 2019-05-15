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

  mission: Mission;
  @Input() scout: Scout = new Scout(0, 'none', 'info@test.com', 1);
  scouts: Scout[] = [];
  scout_id: number;
  submitted = false;
  selectedScout:string;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMission();
    this.data.getScouts().subscribe(data => this.scouts = data);
  }

  getMission(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getMission(id)
      .subscribe(data => this.mission = data);
  }

  onSelect(e):void{
    this.scout_id = +e.target.selectedOptions[0].title;
    this.data.getAssign(this.scout_id).subscribe(data => console.log(data));
  }

  goBack(): void {
    this.location.back();
  }

 save() {
  this.data.addAssign(this.scout_id, this.mission.id);
  //.subscribe(data => this.assign = data);
     return this.submitted;
  }
}
