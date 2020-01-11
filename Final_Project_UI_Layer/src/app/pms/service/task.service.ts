import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  addParentTaskUrl: string = "http://localhost:8081/project-manager/v1/add-parent-task";
  getParentTasksUrl: string = "http://localhost:8081/project-manager/v1/parent-tasks";
  addTaskUrl: string = "http://localhost:8081/project-manager/v1/add-task";
  getTasksUrl: string = "http://localhost:8081/project-manager/v1/tasks";
  getProjectTasksUrl: string = "http://localhost:8081/project-manager/v1/tasks/project/";
  updateTaskUrl: string = "http://localhost:8081/project-manager/v1/update-task";

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  task: Task;

  constructor(private httpClient: HttpClient) { }

  addParentTask(task: Task) {
    return this.httpClient.post<Task>(this.addParentTaskUrl, task, { headers: this.headers });
  }

  getParentTasks() {
    return this.httpClient.get<Task[]>(this.getParentTasksUrl);
  }

  addTask(task: Task) {
    return this.httpClient.post<Task>(this.addTaskUrl, task, { headers: this.headers });
  }

  getTasks() {
    return this.httpClient.get<Task[]>(this.getTasksUrl);
  }

  getProjectTasks(projectId: number) {
    return this.httpClient.get<Task[]>(this.getProjectTasksUrl + projectId);
  }

  updateTask(task: Task) {
    return this.httpClient.put<Task>(this.updateTaskUrl, task, { headers: this.headers });
  }

  setTask(task: Task) {
    this.task = task;
  }

  getTask() {
    return this.task;
  }
}
