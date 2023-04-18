import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleListActiveInfoComponent } from './sale-list-active-info.component';

describe('SaleListActiveInfoComponent', () => {
  let component: SaleListActiveInfoComponent;
  let fixture: ComponentFixture<SaleListActiveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleListActiveInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleListActiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
