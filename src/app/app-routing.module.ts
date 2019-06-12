import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
