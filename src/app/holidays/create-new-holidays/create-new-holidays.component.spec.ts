import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewHolidaysComponent } from './create-new-holidays.component';

describe('CreateNewHolidaysComponent', () => {
  let component: CreateNewHolidaysComponent;
  let fixture: ComponentFixture<CreateNewHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
