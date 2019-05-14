import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Mission } from '../mission';
import { Scout } from '../scout';
import { DataService } from '../data.service';
import { AssignedDataService } from '../assigned-data.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})

export class MissionComponent implements OnInit {

  @Input() mission: Mission;
  @Input() scout: Scout;
  
  scouts: Scout[];
  selectScoutForm: FormGroup;
  submitted = false;
  success = false;
  selectedScout: string = '';
  selectedScoutID = 0;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location,
    private assignedData: AssignedDataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMission();

    this.selectScoutForm = this.formBuilder.group({
      scoutName: ['']
    });

    this.data.getScouts().subscribe(data => this.scouts = data)
  }

  getMission(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getMission(id)
      .subscribe(data => this.mission = data);
  }

  changeScout(e) {
    this.scoutName.setValue(e.target.selectedOptions[0].text, {
      onlySelf: true
    })
    this.selectedScout = e.target.selectedOptions[0].text;
    this.scouts['results'].filter(e => {
      if(e.name === this.selectedScout) this.selectedScoutID = e.id});
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {  
    this.assignedData.add(this.mission, this.selectedScoutID).subscribe(() => this.goBack());
  }

  get scoutName() {
    return this.selectScoutForm.get('scoutName');
    }
}
