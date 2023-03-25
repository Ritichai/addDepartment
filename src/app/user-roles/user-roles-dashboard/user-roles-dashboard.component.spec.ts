import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesDashboardComponent } from './user-roles-dashboard.component';

describe('UserRolesDashboardComponent', () => {
  let component: UserRolesDashboardComponent;
  let fixture: ComponentFixture<UserRolesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
