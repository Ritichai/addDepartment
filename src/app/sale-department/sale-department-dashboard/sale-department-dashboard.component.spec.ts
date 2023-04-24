import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDepartmentDashboardComponent } from './sale-department-dashboard.component';

describe('SaleDepartmentDashboardComponent', () => {
  let component: SaleDepartmentDashboardComponent;
  let fixture: ComponentFixture<SaleDepartmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDepartmentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleDepartmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
