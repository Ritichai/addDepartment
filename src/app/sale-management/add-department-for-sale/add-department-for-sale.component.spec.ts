import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentForSaleComponent } from './add-department-for-sale.component';

describe('AddDepartmentForSaleComponent', () => {
  let component: AddDepartmentForSaleComponent;
  let fixture: ComponentFixture<AddDepartmentForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentForSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
