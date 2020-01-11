import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Project } from '../model/project.model';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {

  @Input() selectedProjectId: number;
  @Input() projects: Project[];
  @Output() projectModalEvent = new EventEmitter();

  searchProject: string = '';

  constructor() { }

  ngOnInit() {
  }

  filterProject() {
    let searchProject = this.searchProject.toLowerCase();
    this.projects.forEach(proj => {
      proj.hide = (proj.project.toLowerCase().indexOf(searchProject) == -1);
    });
  }

  saveProjectId() {
    this.projectModalEvent.emit(this.selectedProjectId);
  }
}
