import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardTitle: string = 'Dashboard';

  missionsStatsTitle: string = 'Missions Stats';
  scoutsStatsTitle: string = 'Scouts Stats';

  scouts: Object;
  missions: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data =>
      this.scouts = data
      //console.log(data["results"])
    )

    this.data.getMissions().subscribe(data =>
      this.missions = data
    )
  }

}
