import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadTimeService {

  hostURL = environment.HOST_URL;


  constructor(private http: HttpClient) { }

  getLeadtimeList() {
    return this.http.get(this.hostURL + '/leadtime-processes', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

  editLeadtimeByID(id:Number, leadtime:Number) {
    return this.http.post(this.hostURL + '/leadtime-processes/'+'edit-leadtime/' + id, { leadtime }, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
      observe: 'response',
    });
  }

}
