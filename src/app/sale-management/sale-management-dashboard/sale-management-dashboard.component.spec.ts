import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleManagementDashboardComponent } from './sale-management-dashboard.component';

describe('SaleManagementDashboardComponent', () => {
  let component: SaleManagementDashboardComponent;
  let fixture: ComponentFixture<SaleManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleManagementDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
