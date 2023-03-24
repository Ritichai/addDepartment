import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubMenuFormComponent } from './create-sub-menu-form.component';

describe('CreateSubMenuFormComponent', () => {
  let component: CreateSubMenuFormComponent;
  let fixture: ComponentFixture<CreateSubMenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubMenuFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
