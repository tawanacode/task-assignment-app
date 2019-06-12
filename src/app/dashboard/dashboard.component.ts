import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

//import { Task } from '../Task';
//import { User } from '../User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardTitle: string = 'Dashboard';

  tasksStatsTitle: string = 'Tasks Stats';
  usersStatsTitle: string = 'Users Stats';

  users: any;
  tasks: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data =>
      this.users = data
    )

    this.data.getTasks().subscribe(data => {
      this.tasks = data
    })
    
  }
}
