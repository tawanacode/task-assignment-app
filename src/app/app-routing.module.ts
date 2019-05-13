import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MissionsComponent } from './missions/missions.component';
import { ScoutsComponent } from './scouts/scouts.component';
import { MissionComponent } from './mission/mission.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'mission/:id', component: MissionComponent },
  { path: 'scouts', component: ScoutsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
