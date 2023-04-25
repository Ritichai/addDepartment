import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleManagementService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) { }

  getUserRoleSaleList() {
    return this.http.get(this.hostURL + '/user_department/getUserRoleSale', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  setDepartmentForSaleBySaleID(id: number, department_id: number) {
    return this.http.post(this.hostURL + '/user_department/setDepartmentForSaleByID/' + id, {
      id: department_id
    }, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  getUserRoleSaleByID(id: number) {
    return this.http.get(this.hostURL + '/user_department/getUserRoleSaleByID/' + id, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

}
