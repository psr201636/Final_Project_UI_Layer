import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './pms/add-task/add-task.component';
import { AddProjectComponent } from './pms/add-project/add-project.component';
import { ViewTaskComponent } from './pms/view-task/view-task.component';
import { AddUserComponent } from './pms/add-user/add-user.component';
import { UserModalComponent } from './pms/user-modal/user-modal.component';
import { ProjectModalComponent } from './pms/project-modal/project-modal.component';
import { ParentTaskModalComponent } from './pms/parent-task-modal/parent-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AddProjectComponent,
    ViewTaskComponent,
    AddUserComponent,
    UserModalComponent,
    ProjectModalComponent,
    ParentTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
