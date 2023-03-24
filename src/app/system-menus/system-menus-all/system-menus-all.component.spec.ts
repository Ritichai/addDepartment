import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenusAllComponent } from './system-menus-all.component';

describe('SystemMenusAllComponent', () => {
  let component: SystemMenusAllComponent;
  let fixture: ComponentFixture<SystemMenusAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMenusAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMenusAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
