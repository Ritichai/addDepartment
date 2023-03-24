import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSystemMenusComponent } from './create-system-menus.component';

describe('CreateSystemMenusComponent', () => {
  let component: CreateSystemMenusComponent;
  let fixture: ComponentFixture<CreateSystemMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSystemMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSystemMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
