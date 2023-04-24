import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  hostURL = environment.HOST_URL;

  constructor(private http: HttpClient) {}


}
