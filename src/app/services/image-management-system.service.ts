import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageManageMentSystemService {
  host = environment.HOST_URL;
  imageManageMentSystem = '/image-management-system';
  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient
  ) { }

    getImages() {
      return this.http.get(this.host + this.imageManageMentSystem, {
        headers: new HttpHeaders()
          .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
          .set("Content-Type", "application/json"),
        observe: 'response'
      });
    }
    uploadSingleFile(file: File) {
      const formData = new FormData();
      formData.append('image',file, file.name);
      formData.append('token', this.token || 'tokenUndefined');
      formData.append('createdBy', '1');
      const upload = new HttpRequest('POST', this.host + this.imageManageMentSystem+'/single-upload', formData, {
        headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem("token")),
        reportProgress: true
      });
      return this.http.request(upload);
    }
    uploadFileMultiple(formData: FormData): Observable<any> {
      formData.append('token', this.token || 'tokenUndefined');
      formData.append('createdBy', '1');
      const upload = new HttpRequest('POST', this.host + this.imageManageMentSystem+ '/multiple-upload', formData, {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        reportProgress: true,
      });
      return this.http.request(upload);
    }
    downloadImage(imageId: any) {
      //download/:id
      return this.http.get(this.host + this.imageManageMentSystem + '/download/' + imageId, {
        headers: new HttpHeaders()
          .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
          .set("Content-Type", "application/json"),
        responseType: 'blob'
      });
    }
}
