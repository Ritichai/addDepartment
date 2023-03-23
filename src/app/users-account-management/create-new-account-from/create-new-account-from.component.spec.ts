import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAccountFromComponent } from './create-new-account-from.component';

describe('CreateNewAccountFromComponent', () => {
  let component: CreateNewAccountFromComponent;
  let fixture: ComponentFixture<CreateNewAccountFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAccountFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewAccountFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
