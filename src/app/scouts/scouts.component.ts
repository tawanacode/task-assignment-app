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

  getScouts(): void {
    this.data.getScouts().subscribe(data => {
      this.scouts = data['results'].map((e: any, i: number) => {
        let idx = [];
        this.data.getAssignDB().subscribe(data => {
          return data.filter(el => el.scout_id === e.id).map(ele => {
            return idx.push(ele.mission_id);
          });
        })
        return this.addMissions({ ...e, missions: [] }, idx);
      })
    })
  }

  addMissions(scoutObj: any, missionId: any) {
    if (missionId.length) this.data.getMissions().subscribe(data => {
      data['results'].filter(e => {
        for (let i of missionId) if (e.id === i) scoutObj.missions.push(e);
      });
    });
    return scoutObj;
  }
}