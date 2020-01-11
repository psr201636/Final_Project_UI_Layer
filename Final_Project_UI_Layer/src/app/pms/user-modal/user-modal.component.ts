import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() modalHeaderMsg: string;
  @Input() selectedUserId: number;
  @Input() users: User[];
  @Output() userModalEvent = new EventEmitter();

  searchUser: string = '';

  constructor() { }

  ngOnInit() {
  }

  filterUser() {
    let searchUser = this.searchUser.toLowerCase();
    this.users.forEach(usr => {
      usr.hide = (usr.firstName.toLowerCase().indexOf(searchUser) == -1 && usr.lastName.toLowerCase().indexOf(searchUser) == -1);
    });
  }

  saveUserId() {
    this.userModalEvent.emit(this.selectedUserId);
  }
}
