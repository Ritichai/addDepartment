import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProductFormComponent } from './create-new-product-form.component';

describe('CreateNewProductFormComponent', () => {
  let component: CreateNewProductFormComponent;
  let fixture: ComponentFixture<CreateNewProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
