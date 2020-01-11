import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  addOperation: boolean = true;
  alertMessage: string = '';
  alertClass: string = '';
  searchText: string = '';

  @Input() users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  addUser() {
    if (this.isValid()) {
      this.userService.addUser(this.user).subscribe(
        (response) => {
          this.resetUser();
          this.getUsers();
          this.alertSuccess('User added successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    } else {
      this.alertError('Input Error: All fields are mandatory!');
    }
  }

  loadUser(usr: User) {
    this.user = usr;
    this.addOperation = false;
    this.alertMessage = '';
  }

  updateUser() {
    if (this.isValid()) {
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          this.user = new User();
          this.addOperation = true;
          this.alertSuccess('User updated successfully!');
        },
        (error) => this.alertError('System Error. Please try again later')
      )
    } else {
      this.alertError('Input Error: All fields are mandatory!');
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        this.getUsers();
        this.alertSuccess('User deleted successfully!');
      },
      (error) => this.alertError('System Error. Please try again later')
    )
  }

  resetUser() {
    this.user = new User();
    this.addOperation = true;
    this.alertMessage = '';
  }

  sortUsers(sortBy: string) {
    if (sortBy == 'FN') {
      this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy == 'LN') {
      this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else {
      this.users.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
    }
  }

  search() {
    let searchTxt = this.searchText.toLowerCase();
    this.users.forEach(usr => {
      usr.hide = (usr.firstName.toLowerCase().indexOf(searchTxt) == -1) && (usr.lastName.toLowerCase().indexOf(searchTxt) == -1)
        && (usr.employeeId.toLowerCase().indexOf(searchTxt) == -1);
    });
  }

  isValid() {
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    this.user.employeeId = this.user.employeeId.trim();

    return (this.user.firstName != '' && this.user.lastName != '' && this.user.employeeId != '');
  }

  alertError(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-danger';
  }

  alertSuccess(message: string) {
    this.alertMessage = message;
    this.alertClass = 'alert-success';
  }
}
