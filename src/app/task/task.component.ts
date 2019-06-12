import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../tasks';
import { User } from '../user';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-Task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  assign: Assign;
  assignAll: Assign[];
  task: Task;
  users: any;
  user_id: number = 0;
  user: User = new User(this.user_id, '-', '-', 'info@User.co.za');
  submitted = false;
  selectedUser: string = 'none';

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.data.getUsers().subscribe(data => this.users = data);
    this.getTask();
    }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.data.getTask(id).subscribe(data => {
      this.task = data;
    });
    this.data.getAssignDB().subscribe(data => {
      data.filter(e => e.task_id === id).map(e => this.assign = e);
    });
    this.getUserName(id, this.assign.user_id)
  }

  getUserName(taskId:number, userId:number):void{
    if(userId) this.data.getAssignByTask(taskId).subscribe(data => {
      this.user = data;
    });
  }

  onSelect(e): void {
    e.preventDefault;
    this.user_id = +e.target.selectedOptions[0].title;
    this.data.getUser(this.user_id).subscribe(data => this.user = data);
   }

  goBack():void{
    this.location.back();
  }
  save():void {  
    console.log(this.task.id, this.user_id)
    this.data.updateAssignDB(this.user_id, this.task.id).subscribe();
    this.submitted;
    this.location.back();
  }
}
