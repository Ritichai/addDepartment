import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) {
  }

  getProductsList(): Observable<any> {
    return this.http.get(this.hostURL + '/product', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get(this.hostURL + '/product/' + productId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  createNewProduct(
    category: string,
    group: string,
    product_code: string,
    trade_name: string,
    common_name: string,
    packing: string,
    size: number,
    pack_qty: string,
    product_unit: string,
    price: number,
  ): Observable<any> {
    return this.http.post(
      this.hostURL + '/product',
      {
        category,
        group,
        product_code,
        trade_name,
        common_name,
        packing,
        size,
        pack_qty,
        product_unit,
        price,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

  updateProduct(
    productId: number,
    category: string,
    group: string,
    product_code: string,
    trade_name: string,
    common_name: string,
    packing: string,
    size: number,
    pack_qty: string,
    product_unit: string,
    price: number,
  ): Observable<any> {
    return this.http.put(
      this.hostURL + '/product/',
      {
        id: productId,
        category,
        group,
        product_code,
        trade_name,
        common_name,
        packing,
        size,
        pack_qty,
        product_unit,
        price,
      },
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(this.hostURL + '/product/' + productId, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  uploadBatchProduct(data: any[]): Observable<any> {
    return this.http.post(
      this.hostURL + '/product/batch',
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
