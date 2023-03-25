import { LoadingService } from './../../services/loading.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { ImageManageMentSystemService } from '../../services/image-management-system.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})

export class ViewImagesComponent {

  imageLists: any;
  FileSaver:any;
  loading$ = this.loadingService.isLoading$;
  constructor(
      private imageManagementSystemService: ImageManageMentSystemService,
      private sanitizer: DomSanitizer,
      private http: HttpClient,
      private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.showLoading();
    this.imageManagementSystemService.getImages().subscribe((response) => {
      if(response.status == 201) {
        this.imageLists = response.body;
      }
      this.hiddenLoading();
    })
  }
  getImages(data: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data);
}
 hiddenLoading() {
    this.loadingService.hidden();
 }
  showLoading() {
    this.loadingService.show();
  }



  downloadImage(imageId: string) {
    this.imageManagementSystemService.downloadImage(imageId).subscribe((response:Blob) => {
      let downloadUrl = window.URL.createObjectURL(response);
      const Filename = 'image'+imageId+'.jpg';
      saveAs(downloadUrl, Filename);
    });
  }
}
