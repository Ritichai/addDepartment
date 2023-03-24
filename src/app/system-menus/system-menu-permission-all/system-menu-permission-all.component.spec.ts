import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenuPermissionAllComponent } from './system-menu-permission-all.component';

describe('SystemMenuPermissionAllComponent', () => {
  let component: SystemMenuPermissionAllComponent;
  let fixture: ComponentFixture<SystemMenuPermissionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMenuPermissionAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMenuPermissionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
