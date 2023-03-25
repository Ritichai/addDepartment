import Swal from 'sweetalert2';
import { ImageManageMentSystemService } from 'src/app/services/image-management-system.service';
import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-upload-multiple-images',
  templateUrl: './upload-multiple-images.component.html',
  styleUrls: ['./upload-multiple-images.component.scss']
})
export class UploadMultipleImagesComponent {

  uploadStatus = '';
  file: any;
  filename = '';
  progress = 0;
  imagesUrls = new Map();
  filesToUpload: File[] = [];

  constructor(
    private imageService: ImageManageMentSystemService,
  ) {}

  onFileSelectedArray(event: any) {
    this.uploadStatus = '';
    const files: File[] = Array.from(event.target.files);
    if (files && files.length > 0) {
      this.filesToUpload = files.filter(file => file.type.startsWith('image/'));
      console.log('Selected files:', this.filesToUpload);
    } else {
      console.log('No files selected');
    }
  }

  getImgUrl(file: File): any {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagesUrls.set(file, e.target.result);
    };
    if(!this.imagesUrls.get(file)){
      reader.readAsDataURL(file);
    }
    else{
    return this.imagesUrls.get(file);
    }
  }

  uploadFileMultiple() {
    console.log("files", this.filesToUpload);
    const formData = new FormData();
    for (let i = 0; i < this.filesToUpload.length; i++) {
      formData.append('images', this.filesToUpload[i], this.filesToUpload[i].name);
    }

    this.imageService.uploadFileMultiple(formData).subscribe((event: any) => {
      console.log('event', event);
      if (event.status === 200) {
        this.uploadFail(event.body.message);
      }else{
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.filesToUpload = [];
          this.uploadSuccess(event.body.message);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  clearFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.value = '';
  }

  async uploadSuccess(data: any) {
    await Swal.fire({
      title: 'บันทึกสำเร็จ!',
      text: data,
      icon: 'success',
      confirmButtonText: 'ปิด',
    });
    this.file = null;
    this.progress = 0;
    this.clearFileInput();
  }


  uploadFail(data: any) {
    Swal.fire({
      title: 'บันทึกไม่สำเร็จ!',
      text: data,
      icon: 'error',
      confirmButtonText: 'ปิด',
    });
    this.uploadStatus = '';
    this.progress = 0;
  }

checkInputFile(){
  if(this.filesToUpload.length > 0){
   this.uploadFileMultiple();
  }else{
    Swal.fire({
      title: 'ไม่พบไฟล์!',
      text: 'กรุณาเลือกไฟล์ที่ต้องการอัพโหลด',
      icon: 'warning',
      confirmButtonText: 'ปิด',
    });
  }
}

}
