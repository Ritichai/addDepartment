import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCustomerFormComponent } from './create-new-customer-form.component';

describe('CreateNewCustomerFormComponent', () => {
  let component: CreateNewCustomerFormComponent;
  let fixture: ComponentFixture<CreateNewCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewCustomerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
