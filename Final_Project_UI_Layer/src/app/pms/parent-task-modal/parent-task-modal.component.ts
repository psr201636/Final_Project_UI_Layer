import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../model/task.model';

@Component({
  selector: 'parent-task-modal',
  templateUrl: './parent-task-modal.component.html',
  styleUrls: ['./parent-task-modal.component.css']
})
export class ParentTaskModalComponent implements OnInit {

  @Input() selectedParentId: number;
  @Input() parentTasks: Task[];
  @Output() parentTaskModalEvent = new EventEmitter();

  searchParentTask: string = '';

  constructor() { }

  ngOnInit() {
  }

  filterParentTask() {
    let searchParentTask = this.searchParentTask.toLowerCase();
    this.parentTasks.forEach(parentTask => {
      parentTask.hide = (parentTask.task.toLowerCase().indexOf(searchParentTask) == -1);
    });
  }

  saveParentId() {
    this.parentTaskModalEvent.emit(this.selectedParentId);
  }
}
