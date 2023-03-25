import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserRoleManagementService {
  host = environment.HOST_URL;
  APIPath: string = "/user-role-management/";
  constructor(
    private http: HttpClient
  ) { }

  getMenuPermissionByRole(roleID: number) {
    return this.http.get(this.host + this.APIPath + "menu-permission-by-role/" + roleID, {
      headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
      observe: 'response'
    });
  }

  getRoleList() {
    return this.http.get(this.host + this.APIPath, {
      headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
      observe: 'response'
    });
  }
}
