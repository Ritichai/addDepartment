import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as moment from "moment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  host = environment.HOST_URL;
  // host: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  test() {
    return this.http.get(this.host);
  }



  login(account: any) {
    account["client_timestamp"] = moment().unix();
    return this.http.post(this.host + "/login", JSON.stringify(account), {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: 'text'
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
