import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSystemMenuPermissionComponent } from './create-system-menu-permission.component';

describe('CreateSystemMenuPermissionComponent', () => {
  let component: CreateSystemMenuPermissionComponent;
  let fixture: ComponentFixture<CreateSystemMenuPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSystemMenuPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSystemMenuPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
