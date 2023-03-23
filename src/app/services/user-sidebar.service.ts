import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserSidebarService {
  host = environment.HOST_URL;

  constructor(
    private http: HttpClient
  ) { }

  getMySidebarMenu() {
    return this.http.get(this.host + "/user-accounts/my-sidebar-menu", {
      headers: new HttpHeaders()
        .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
      observe: "response",
    });
  }
}
