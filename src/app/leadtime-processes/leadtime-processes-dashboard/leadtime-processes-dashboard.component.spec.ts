import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadtimeProcessesDashboardComponent } from './leadtime-processes-dashboard.component';

describe('LeadtimeProcessesDashboardComponent', () => {
  let component: LeadtimeProcessesDashboardComponent;
  let fixture: ComponentFixture<LeadtimeProcessesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadtimeProcessesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadtimeProcessesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
