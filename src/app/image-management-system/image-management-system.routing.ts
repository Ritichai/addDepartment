import { UploadMultipleImagesComponent } from './upload-multiple-images/upload-multiple-images.component';
import { UploadSingleImageComponent } from './upload-single-image/upload-single-image.component';
import { ViewImagesComponent } from './view-images/view-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'view-images',component:ViewImagesComponent},
  {path:'upload-single-image',component:UploadSingleImageComponent},
  {path:'upload-multiple-images',component:UploadMultipleImagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageManagementSystemRoutingModule { }
