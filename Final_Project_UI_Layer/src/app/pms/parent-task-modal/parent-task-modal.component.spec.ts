import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentTaskModalComponent } from './parent-task-modal.component';

describe('ParentTaskModalComponent', () => {
  let component: ParentTaskModalComponent;
  let fixture: ComponentFixture<ParentTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
