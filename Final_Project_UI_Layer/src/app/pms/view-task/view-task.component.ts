import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projectId: number;
  alertMessage: string = '';
  alertClass: string = '';

  @Input() projects: Project[];
  @Input() tasks: Task[];

  constructor(private projectService: ProjectService, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  sortTasks(sortBy: string) {
    if (sortBy == 'SD') {
      this.tasks.sort((a, b) => (a.startDate && b.startDate) ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime() : 0);
    } else if (sortBy == 'ED') {
      this.tasks.sort((a, b) => (a.endDate && b.endDate) ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime() : 0);
    } else if (sortBy == 'PR') {
      this.tasks.sort((a, b) => b.priority - a.priority);
    } else {
      this.tasks.sort((a, b) => a.status.localeCompare(b.status));
    }
  }

  endTask(task: Task) {
    task.status = 'COMPLETE';
    this.taskService.updateTask(task).subscribe(
      (response) => {
        this.alertSuccess('Task ended successfully');
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  loadTask(task: Task) {
    this.taskService.setTask(task);
    this.router.navigate(['/add-task']);
  }

  alertError(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-danger';
  }

  alertSuccess(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-success';
  }

  handleSelectedProject(selectedProjectId: number) {
    this.projectId = selectedProjectId;

    this.taskService.getProjectTasks(selectedProjectId).subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => console.log(error)
    )
  }
}
