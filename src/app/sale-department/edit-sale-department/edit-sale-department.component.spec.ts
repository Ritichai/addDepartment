import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaleDepartmentComponent } from './edit-sale-department.component';

describe('EditSaleDepartmentComponent', () => {
  let component: EditSaleDepartmentComponent;
  let fixture: ComponentFixture<EditSaleDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSaleDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSaleDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
