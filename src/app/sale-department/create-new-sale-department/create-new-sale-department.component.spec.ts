import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSaleDepartmentComponent } from './create-new-sale-department.component';

describe('CreateNewSaleDepartmentComponent', () => {
  let component: CreateNewSaleDepartmentComponent;
  let fixture: ComponentFixture<CreateNewSaleDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewSaleDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewSaleDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
