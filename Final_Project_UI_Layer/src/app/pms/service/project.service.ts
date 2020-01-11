import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  addProjectUrl: string = "http://localhost:8081/project-manager/v1/add-project";
  getProjectsUrl: string = "http://localhost:8081/project-manager/v1/projects";
  getProjectsDetailUrl: string = "http://localhost:8081/project-manager/v1/projects/detail";
  updateProjectUrl: string = "http://localhost:8081/project-manager/v1/update-project";

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addProject(project: Project) {
    return this.httpClient.post<Project>(this.addProjectUrl, project, { headers: this.headers });
  }

  getProjects() {
    return this.httpClient.get<Project[]>(this.getProjectsUrl);
  }

  getProjectsDetail() {
    return this.httpClient.get<Project[]>(this.getProjectsDetailUrl);
  }

  updateProject(project: Project) {
    return this.httpClient.put<Project>(this.updateProjectUrl, project, { headers: this.headers });
  }
}
