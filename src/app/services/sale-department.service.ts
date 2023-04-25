import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleDepartmentService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) {}

  getSaleDepartment(){
    return this.http.get(this.hostURL + '/sale-department', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  createNewSaleDepartment(
    sale_department_name:string,
  ){
    return this.http.post(
      this.hostURL + '/sale-department/createSaleDepartment',
      {
        sale_department_name:sale_department_name,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }
  getSaleDepartmentById(sale_department_id:number) {
    return this.http.get(this.hostURL + '/sale-department/getSaleDepartmentById/' + sale_department_id, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }
  editSaleDepartment(
    sale_department_id:number,
    sale_department_name:string,
  ){
    return this.http.put(
      this.hostURL + '/sale-department/editSaleDepartment/'+sale_department_id,
      {
        sale_department_name:sale_department_name,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }
}
