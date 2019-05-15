import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { Assign } from '../assign';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardTitle: string = 'Dashboard';

  missionsStatsTitle: string = 'Missions Stats';
  scoutsStatsTitle: string = 'Scouts Stats';

  scouts: Scout[];
  missions: Mission[];
  assignAll: Assign[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data =>
      this.scouts = data
    )
    this.data.getAssignDB().subscribe(data => this.assignAll = data);

    this.data.getMissions().subscribe(data => {
      this.missions = data['results']
      //console.log()
      this.missions.forEach((e, i) => this.data.addAssignDB(i, 0, e.id))
    })
  }
}
