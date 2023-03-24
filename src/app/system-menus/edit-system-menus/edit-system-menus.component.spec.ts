import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemMenusComponent } from './edit-system-menus.component';

describe('EditSystemMenusComponent', () => {
  let component: EditSystemMenusComponent;
  let fixture: ComponentFixture<EditSystemMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSystemMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSystemMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
