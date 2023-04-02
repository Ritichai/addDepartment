import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerFormComponent } from './edit-customer-form.component';

describe('EditCustomerFormComponent', () => {
  let component: EditCustomerFormComponent;
  let fixture: ComponentFixture<EditCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
