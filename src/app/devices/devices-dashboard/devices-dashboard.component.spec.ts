import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesDashboardComponent } from './devices-dashboard.component';

describe('DevicesDashboardComponent', () => {
  let component: DevicesDashboardComponent;
  let fixture: ComponentFixture<DevicesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
