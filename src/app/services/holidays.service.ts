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
  createHolidays(
    holiday_date: string,
    holiday_name: string,
    holiday_year: Number
  ) {
    return this.http.post(
      this.hostURL + '/holidays/createHolidays',
      [
        {
          holiday_date: holiday_date,
          holiday_name: holiday_name,
          holiday_year: holiday_year,
        }
      ],
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }
  getHolidayById(id: string) {
    return this.http.get(this.hostURL + '/holidays/' + id, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  editHolidayData(
    id : string,
    holiday_date: string,
    holiday_name: string,
    holiday_year: Number
  ) {
    return this.http.put(
      this.hostURL + '/holidays/'+ id,
        {
          holiday_date: holiday_date,
          holiday_name: holiday_name,
          holiday_year: holiday_year,
        }
      ,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

}
