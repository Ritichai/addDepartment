import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysDashboardComponent } from './holidays-dashboard.component';

describe('HolidaysDashboardComponent', () => {
  let component: HolidaysDashboardComponent;
  let fixture: ComponentFixture<HolidaysDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidaysDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
