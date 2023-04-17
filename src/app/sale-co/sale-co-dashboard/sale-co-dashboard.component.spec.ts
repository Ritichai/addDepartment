import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCoDashboardComponent } from './sale-co-dashboard.component';

describe('SaleCoDashboardComponent', () => {
  let component: SaleCoDashboardComponent;
  let fixture: ComponentFixture<SaleCoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCoDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
