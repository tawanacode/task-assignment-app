import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})

export class MissionComponent implements OnInit {

  @Input() mission: Mission;
  scouts: Scout[];
  selectScoutForm: FormGroup;
  submitted = false;
  success = false;


  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMission();

    this.selectScoutForm = this.formBuilder.group({
      scoutName: ['']
    });

    this.data.getScouts().subscribe(data =>
      this.scouts = data
    )
  }

  getMission(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getMission(id)
      .subscribe(data => this.mission = data);
  }

  changeScout(e) {
    console.log(e.target.value)
    this.scoutName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get scoutName() {
    return this.selectScoutForm.get('scoutName');
    }
}
