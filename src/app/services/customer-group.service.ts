import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupService {

  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) { }

  getCustomerGroupList(): Observable<any> {
    return this.http.get(this.hostURL + '/customer-group', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  getCustomerGroupById(customerGroupId: number): Observable<any> {
    return this.http.get(this.hostURL + '/customer-group/' + customerGroupId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  createNewCustomerGroup(
    groupName: string,
  ): Observable<any> {
    return this.http.post(
      this.hostURL + '/customer-group',
      {
        name: groupName,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }

  updateCustomerGroup(
    customerGroupId: number,
    groupName: string,
  ): Observable<any> {
    return this.http.put(
      this.hostURL + '/customer-group/' + customerGroupId,
      {
        name: groupName,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }

  deleteCustomerGroup(customerGroupId: number): Observable<any> {
    return this.http.delete(this.hostURL + '/customer-group/' + customerGroupId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  uploadBatchCustomerGroup(data: any[]): Observable<any> {
    return this.http.post(
      this.hostURL + '/customer-group/batch',
      data,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }
}
