import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSubmenusAllComponent } from './system-submenus-all.component';

describe('SystemSubmenusAllComponent', () => {
  let component: SystemSubmenusAllComponent;
  let fixture: ComponentFixture<SystemSubmenusAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSubmenusAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSubmenusAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
