import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDeviceFormComponent } from './create-new-device-form.component';

describe('CreateNewDeviceFormComponent', () => {
  let component: CreateNewDeviceFormComponent;
  let fixture: ComponentFixture<CreateNewDeviceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewDeviceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
