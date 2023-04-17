import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSaleforecastComponent } from './open-saleforecast.component';

describe('OpenSaleforecastComponent', () => {
  let component: OpenSaleforecastComponent;
  let fixture: ComponentFixture<OpenSaleforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenSaleforecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSaleforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
