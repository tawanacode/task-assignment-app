import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-Tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  tasksTitle: string = 'Tasks';
  assignAll: Assign[];
  tasks: Task[];

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks():void {
    this.data.getTasks().subscribe(data =>{
      if(this.data.assignDB.length === 0) this.populateAssignDB(data);
      this.tasks = data.map((e:any, i:number) => {
        const idx = this.data.assignDB[i].user_id;
        return this.addUserName({...e, user: '-' }, e.id, idx);
      });
    });
  }

  addUserName(tasksObj:any, taskId:number, userId:number){
    if(userId) this.data.getAssignByTask(taskId).subscribe(data => {
      tasksObj.user = data.username;
    });
    return tasksObj;
  }

   populateAssignDB(data:any):void {
    data.map((e:any, i:number) => this.data.addAssignDB(i, 0, e.id));
  }
}