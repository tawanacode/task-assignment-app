import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { DataService } from '../data.service';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  styleUrls: ['./scout.component.scss']
})
export class ScoutComponent implements OnInit {

  mission: Mission;
  scout: Scout;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location) { }

  ngOnInit() {
    this.getScout();
  }

  getScout(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getScout(id)
      .subscribe(data => this.scout = data);
  }
}
