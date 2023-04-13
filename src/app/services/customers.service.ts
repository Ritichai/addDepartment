import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any> {
    return this.http.get(this.hostURL + '/customer', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  getCustomerById(customerId: number): Observable<any> {
    return this.http.get(this.hostURL + '/customer/' + customerId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  createNewCustomer(
    customer_code: string,
    customer_name: string,
    customer_province: string,
    customer_group: string,
  ): Observable<any> {
    return this.http.post(
      this.hostURL + '/customer',
      {
        customer_code,
        customer_name,
        customer_province,
        customer_group,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }

  updateCustomer(
    customerId: number,
    customer_code: string,
    customer_name: string,
    customer_province: string,
    customer_group: string,
  ): Observable<any> {
    return this.http.put(
      this.hostURL + '/customer',
      {
        id: customerId,
        customer_code,
        customer_name,
        customer_province,
        customer_group,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }
    );
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(this.hostURL + '/customer/' + customerId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  uploadBatchCustomer(data: any[]): Observable<any> {
    return this.http.post(
      this.hostURL + '/customer/batch',
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
