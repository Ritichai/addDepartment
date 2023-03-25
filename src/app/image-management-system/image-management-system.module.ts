import { MaterialModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageManagementSystemRoutingModule } from './image-management-system.routing';
import { ViewImagesComponent } from './view-images/view-images.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { UploadMultipleImagesComponent } from './upload-multiple-images/upload-multiple-images.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ViewImagesComponent,
    UploadSingleImageComponent,
    UploadMultipleImagesComponent
  ],
  imports: [
    CommonModule,
    ImageManagementSystemRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule

  ]
})
export class ImageManagementSystemModule { }
