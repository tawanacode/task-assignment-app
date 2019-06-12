import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks';
import { User } from '../user';
import { Assign } from '../assign';
import { DataService } from '../data.service';

@Component({
  selector: 'app-Users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersTitle: string = 'Users';
  assigned: Assign[];
  users: User[];
  tasks: Task[];

  constructor(
    private data: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.data.getUsers().subscribe(data => {
      this.users = data.map((e: any, i: number) => {
        let idx = [];
        this.data.getAssignDB().subscribe(data => {
          return data.filter(el => el.user_id === e.id).map(ele => {
            return idx.push(ele.task_id);
          });
        })
        return this.addTasks({ ...e, tasks: [] }, idx);
      })
    })
  }

  addTasks(userObj: any, taskId: any) {
    if (taskId.length) this.data.getTasks().subscribe(data => {
      data.filter(e => {
        for (let i of taskId) if (e.id === i) userObj.tasks.push(e);
      });
    });
    return userObj;
  }
}