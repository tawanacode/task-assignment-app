import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-scouts',
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutsComponent implements OnInit {

  scoutsTitle: string = 'Scouts';
  scouts: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getScouts().subscribe(data =>
      this.scouts = data
      //console.log(data)
    )
  }

}
