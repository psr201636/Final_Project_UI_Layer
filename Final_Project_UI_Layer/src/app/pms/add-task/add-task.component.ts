import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import Helper from '../util/Helper';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();
  alertMessage: string = '';
  alertClass: string = '';
  addOperation: boolean = true;
  parentChecked: boolean = false;
  modalHeaderMsg: string = 'Select User';

  @Input() projects: Project[];
  @Input() parentTasks: Task[];
  @Input() users: User[];

  constructor(private projectService: ProjectService, private userService: UserService, private taskService: TaskService) { }

  ngOnInit() {
    let taskUpdate: Task = this.taskService.getTask();
    if (taskUpdate) {
      this.task = taskUpdate;
      this.addOperation = false;

      if (this.projects == null)
        this.getProjects();
      if (this.parentTasks == null)
        this.getParentTasks();
      if (this.users == null)
        this.getUsers();

      this.taskService.setTask(null);
    }
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  setParentTask(event: any) {

    this.parentChecked = event.target.checked;

    if (this.parentChecked) {
      this.task.priority = 0;
      this.task.parentId = null;
      this.task.startDate = null;
      this.task.endDate = null;
      this.task.userId = null;

      this.users = null;
    }
  }

  resetTask() {
    this.task = new Task();
    this.addOperation = true;
    this.alertMessage = '';
    this.parentChecked = false;
    this.projects = null;
    this.users = null;
  }

  addParentTask() {
    if (this.isParentTaskValid()) {
      this.taskService.addParentTask(this.task).subscribe(
        (response) => {
          this.resetTask();
          this.alertSuccess('Parent Task added successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    } else {
      this.alertError('Input Error: Project and Task are mandatory');
    }
  }

  getParentTasks() {
    this.taskService.getParentTasks().subscribe(
      (response) => {
        this.parentTasks = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  addTask() {
    if (this.isTaskValid()) {
      let copy: any = Object.assign({}, this.task);
      copy.startDate = (this.task.startDate instanceof Date) ? Helper.getDateAsString(this.task.startDate) : this.task.startDate;
      copy.endDate = (this.task.endDate instanceof Date) ? Helper.getDateAsString(this.task.endDate) : this.task.endDate;

      this.taskService.addTask(copy).subscribe(
        (response) => {
          this.resetTask();
          this.alertSuccess('Task added successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    }
  }

  updateTask() {
    if (this.isTaskValid()) {
      let copy: any = Object.assign({}, this.task);
      copy.startDate = (this.task.startDate instanceof Date) ? Helper.getDateAsString(this.task.startDate) : this.task.startDate;
      copy.endDate = (this.task.endDate instanceof Date) ? Helper.getDateAsString(this.task.endDate) : this.task.endDate;

      this.taskService.updateTask(copy).subscribe(
        (response) => {
          this.resetTask();
          this.alertSuccess('Task updated successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    }
  }

  isParentTaskValid() {
    this.task.task = this.task.task.trim();
    return (this.task.projectId != 0 && this.task.task != '');
  }

  isTaskValid() {
    this.task.task = this.task.task.trim();
    let valid = (this.task.projectId != 0 && this.task.task != '' && this.task.priority != 0 && this.task.parentId != 0 && this.task.userId != 0);

    if (!valid) {
      this.alertError('Input Error: Project, Task, Priority, Parent Task and User are mandatory!');
    } else {
      if (!this.parentChecked) {
        if (new Date(this.task.startDate).getTime() > new Date(this.task.endDate).getTime()) {
          valid = false;
          this.alertError('Input Error: Start & End dates are mandatory, End Date should be after Start Date');
        }
      }
    }

    return valid;
  }

  alertError(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-danger';
  }

  alertSuccess(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-success';
  }

  handleSelectedUser(selectedUserId: number) {
    this.task.userId = selectedUserId;
  }

  handleSelectedProject(selectedProjectId: number) {
    this.task.projectId = selectedProjectId;
  }

  handleSelectedParent(selectedParentId: number) {
    this.task.parentId = selectedParentId;
  }
}
