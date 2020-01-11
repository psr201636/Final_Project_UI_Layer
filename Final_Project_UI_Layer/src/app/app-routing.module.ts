import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './pms/add-user/add-user.component';
import { AddProjectComponent } from './pms/add-project/add-project.component';
import { AddTaskComponent } from './pms/add-task/add-task.component';
import { ViewTaskComponent } from './pms/view-task/view-task.component';

const routes: Routes = [
  { path: 'add-project', component: AddProjectComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
  {
    path: '',
    redirectTo: '/add-user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
