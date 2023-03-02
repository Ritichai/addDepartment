import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {
  host = environment.HOST_URL;

  constructor(
    private http: HttpClient
  ) { }

  login(username: any, password: any) {
    let account = {
      username: username,
      password: password,
      client_timestamp: moment().unix()
    };

    return this.http.post(this.host + "/login", JSON.stringify(account), {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: 'response'
    });
  }

  checkLoggedIn() {
    return this.http.post(
      this.host + "/login/check-token",
      {
        headers: new HttpHeaders()
          .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
          .set("Content-Type", "text/plain")
          .set('Accept', 'text/plain'),
        observe: "response",
      }
    );
  }
  
}
