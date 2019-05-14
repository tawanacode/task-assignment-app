import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AssignedDataService } from '../assigned-data.service';

@Component({
  selector: 'app-scouts',
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutsComponent implements OnInit {

  scoutsTitle: string = 'Scouts';
  scouts: Object;
  scoutMissions: any[];
  constructor(
    private data: DataService,
    private assignedData: AssignedDataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data => {
      this.assignedData.scoutMissions = data['results'].map(e => e = { ...e, missions: []});
      this.scouts = data }
    )
  }
}
