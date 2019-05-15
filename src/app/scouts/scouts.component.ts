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
  scouts: Scout[];
  missions: Mission[];
  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data => {
      this.scouts = data}
    )
  }
}
