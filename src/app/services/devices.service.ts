import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) {}

  getDevicesList() {
    return this.http.get(this.hostURL + '/device', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  getDeviceById(deviceId: number) {
    return this.http.get(this.hostURL + '/device/' + deviceId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  createNewDevice(
    device_number: string,
    brand_name: string,
    model_name: string,
    os_name: string,
    color_name: string,
    start_date: string,
    end_date: string
  ) {
    return this.http.post(
      this.hostURL + '/device',
      {
        device_number: device_number,
        brand_name: brand_name,
        model_name: model_name,
        os_name: os_name,
        color_name: color_name,
        start_date: start_date,
        end_date: end_date,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

  updateDevice(
    deviceId: number,
    device_number: string,
    brand_name: string,
    model_name: string,
    os_name: string,
    color_name: string,
    start_date: string,
    end_date: string
  ) {
    return this.http.put(
      this.hostURL + '/device/',
      {
        device_number: device_number,
        brand_name: brand_name,
        model_name: model_name,
        os_name: os_name,
        color_name: color_name,
        start_date: start_date,
        end_date: end_date,
        id: deviceId,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

  deleteDevice(deviceId: number) {
    return this.http.delete(this.hostURL + '/device/' + deviceId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
}
