import { Component } from '@angular/core';
import { ImageManageMentSystemService } from 'src/app/services/image-management-system.service';
import Swal from 'sweetalert2';
import {
  HttpEventType,
  HttpResponse,
  HttpClient,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-upload-single-image',
  templateUrl: './upload-single-image.component.html',
  styleUrls: ['./upload-single-image.component.scss'],
})
export class UploadSingleImageComponent {
  file: any;
  filename = '';
  progress = 0;
  imageUrl = new Map();
  constructor(private imageService: ImageManageMentSystemService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.filename = file.name || '';
      console.log(this.file);
    }
  }

  getImgUrl(file: File): any {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl.set(file, e.target.result);
    };
    if (!this.imageUrl.has(file)) {
      reader.readAsDataURL(file);
    } else {
      return this.imageUrl.get(file);
    }
  }

  uploadFile() {
    this.imageService.uploadSingleFile(this.file).subscribe((event: any) => {
      if (event.status === 200) {
        this.uploadFail(event.body.message);
      } else {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess(event.body.message);
        }
      }
    });
  }

  clearFileInput() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
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
    this.progress = 0;
  }

  checkInputSelect() {
    if (this.file) {
      this.uploadFile();
    } else {
      Swal.fire({
        title: 'กรุณาเลือกไฟล์',
        icon: 'warning',
        confirmButtonText: 'ปิด',
      });
    }
  }

}
