import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Mission } from '../mission';
import { Scout } from '../scout';

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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data =>
      this.scouts = data
    )

    this.data.getMissions().subscribe(data => {
      this.missions = data['results']
      //console.log()
      this.populateAssign(data['results']);
    }
    )
    
  }

  populateAssign(data):void {
    data.forEach((e, i) => this.data.addAssignDB(i, 0, e.id))
  }

}
