import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import Helper from '../util/Helper';
import { UserModalComponent } from '../user-modal/user-modal.component';

declare var $: any;
@Component({
  selector: 'add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  addOperation: boolean = true;
  dateChecked: boolean = false;
  alertMessage: string = '';
  alertClass: string = '';
  searchText: string = '';
  modalHeaderMsg: string = 'Select Manager';

  @Input() users: User[];
  @Input() projects: Project[];

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit() {
    this.getProjectsDetail();
  }

  setDates(event: any) {

    this.dateChecked = event.target.checked;

    if (this.dateChecked) {
      var d = new Date();
      this.project.startDate = d;

      var d1 = new Date();
      d1.setDate(d1.getDate() + 1);
      this.project.endDate = d1;

    } else {
      this.project.startDate = null;
      this.project.endDate = null;
    }
  }

  addProject() {
    if (this.isValid()) {
      let copy: any = Object.assign({}, this.project);
      copy.startDate = (this.project.startDate instanceof Date) ? Helper.getDateAsString(this.project.startDate) : this.project.startDate;
      copy.endDate = (this.project.endDate instanceof Date) ? Helper.getDateAsString(this.project.endDate) : this.project.endDate;

      this.projectService.addProject(copy).subscribe(
        (response) => {
          this.resetProject();
          this.getProjectsDetail();
          this.alertSuccess('Project added successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    }
  }

  getProjectsDetail() {
    this.projectService.getProjectsDetail().subscribe(
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

  resetProject() {
    this.project = new Project();
    this.addOperation = true;
    this.alertMessage = '';
    this.dateChecked = false;
    this.users = null;
  }

  sortProjects(sortBy: string) {
    if (sortBy == 'SD') {
      this.projects.sort((a, b) => (a.startDate && b.startDate) ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime() : 0);
    } else if (sortBy == 'ED') {
      this.projects.sort((a, b) => (a.endDate && b.endDate) ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime() : 0);
    } else if (sortBy == 'PR') {
      this.projects.sort((a, b) => b.priority - a.priority);
    } else {
      //this.projects.sort((a, b) => a.status.localeCompare(b.status));
    }
  }

  search() {
    let searchTxt = this.searchText.toLowerCase();
    this.projects.forEach(proj => {
      proj.hide = (proj.project.toLowerCase().indexOf(searchTxt) == -1);
    });
  }

  loadProject(proj: Project) {
    this.project = proj;
    this.addOperation = false;
    this.alertMessage = '';
    this.dateChecked = (this.project.startDate != null);

    if (this.users == null) {
      this.getUsers();
    }
  }

  updateProject() {
    if (this.isValid()) {
      let copy: any = Object.assign({}, this.project);
      copy.startDate = (this.project.startDate instanceof Date) ? Helper.getDateAsString(this.project.startDate) : this.project.startDate;
      copy.endDate = (this.project.endDate instanceof Date) ? Helper.getDateAsString(this.project.endDate) : this.project.endDate;

      this.projectService.updateProject(copy).subscribe(
        (response) => {
          this.resetProject();
          this.alertSuccess('Project updated successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    }
  }

  /**
   * UI fields validation
   */
  isValid() {
    this.project.project = this.project.project.trim();
    let valid = (this.project.project != '' && this.project.priority != 0 && this.project.userId != 0);

    if (!valid) {
      this.alertError('Input Error: Project, Priority and Manager are mandatory!');
    } else {
      if (this.dateChecked) {
        if (new Date(this.project.startDate).getTime() > new Date(this.project.endDate).getTime()) {
          valid = false;
          this.alertError('Input Error: Start & End dates are mandatory / End Date should be after Start Date');
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
    this.project.userId = selectedUserId;
  }
}
