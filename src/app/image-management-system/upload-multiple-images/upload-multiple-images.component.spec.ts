import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipleImagesComponent } from './upload-multiple-images.component';

describe('UploadMultipleImagesComponent', () => {
  let component: UploadMultipleImagesComponent;
  let fixture: ComponentFixture<UploadMultipleImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMultipleImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMultipleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
