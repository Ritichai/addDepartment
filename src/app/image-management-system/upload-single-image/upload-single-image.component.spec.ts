import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleImageComponent } from './upload-single-image.component';

describe('UploadSingleImageComponent', () => {
  let component: UploadSingleImageComponent;
  let fixture: ComponentFixture<UploadSingleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSingleImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
