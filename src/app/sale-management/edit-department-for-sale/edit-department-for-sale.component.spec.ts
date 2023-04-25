import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentForSaleComponent } from './edit-department-for-sale.component';

describe('EditDepartmentForSaleComponent', () => {
  let component: EditDepartmentForSaleComponent;
  let fixture: ComponentFixture<EditDepartmentForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDepartmentForSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDepartmentForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
