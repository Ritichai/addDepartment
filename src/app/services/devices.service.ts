import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  hostURL = environment.HOST_URL;

  constructor(
    private http: HttpClient
  ) { }

  getDevicesList() {
    return this.http.get(
      this.hostURL + '/devices', {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', localStorage.getItem('token')||'Token not found')
      }
    )
  }
}
