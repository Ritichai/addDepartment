import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleCoService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) { }

  getSaleCo() {
    return this.http.get(this.hostURL + '/selco', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  openSaleForeCastById(
    id: number,
    saleforecast_duedate: string,
    saleforecast_types: number,
  ) {
    return this.http.post(
      this.hostURL + '/selco/openSaleForeCastById/' + id, {
      saleforecast_duedate,
      saleforecast_types,
    },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      });
  }
  getSaleCoByStatus() {
    return this.http.get(this.hostURL + '/selco/getDataStatus', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  getSaleForeCastActive() {
    return this.http.get(this.hostURL + '/selco/getDataStatus', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

}
