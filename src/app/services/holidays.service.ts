import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) {}

  getHolidayList() {
    return this.http.get(this.hostURL + '/holidays', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

}
