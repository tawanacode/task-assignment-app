import { Component, OnInit } from '@angular/core';

import { Mission } from '../mission';
import { DataService } from '../data.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})

export class MissionsComponent implements OnInit {

  missionsTitle: string = 'Missions';
  missions: Mission[];
  scoutData = [];

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getMissions();
  }

  getMissions():void {
    this.data.getMissions().subscribe(data =>
    this.missions = data
    //console.log(data)
  )}
}