// import { UsersLogComponent } from './../users/users-log/users-log.component';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  host = environment.HOST_URL;
  partUsers: string = "/user-accounts/";
  partPersonnel: string = "/personnel/";

  //format Request Get url/:token
  constructor(private http: HttpClient) { }

  deleteUserAccount(id : number) {
    return this.http.delete(
      this.host + this.partUsers + id, {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        observe: 'response'
      }
    )
  }

  editUserAccount(
    titleName : string,
    firstName : string,
    lastName : string,
    employee_code : string,
    employee_position : string,
    user_role : number,
    email : string,
    phone_number : string,
    username : string,
    id : number
  ) {
    const dataUser = {
      titlename: titleName,
      firstname: firstName,
      lastname: lastName,
      employee_code: employee_code,
      employee_position: employee_position,
      role_id: user_role,
      email: email,
      phone_number: phone_number,
      username: username,
      id: id
    };
    return this.http.put(
      this.host + this.partUsers,
      JSON.stringify(dataUser),
      {
        headers: new HttpHeaders()
          .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
          .set("Content-Type", "application/json"),
          observe: "response",
      }
    );
  }

  getAccountInfoForEdit(user_id : number) {
    return this.http.get(
      this.host + this.partUsers + 'for-edit/' + user_id,
      {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        observe: 'response'
      }
    )
  }


  userSuspension(username : string) {
    return this.http.delete(this.host + this.partUsers + username, {
      headers: new HttpHeaders()
        .append("Content-Type", "application/json")
        .append("Authorization", localStorage.getItem("token")||'TokenNotFound'),
    });
  }

  cancelUserSuspension(username : string) {
    return this.http.delete(this.host + this.partUsers + "cancel/" + username, {
      headers: new HttpHeaders()
        .append("Content-Type", "application/json")
        .append("Authorization", localStorage.getItem("token")||'TokenNotFound'),
    });
  }

  test() {
    // return this.http.get(this.host);
    return this.http.get(this.host + this.partPersonnel, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  resetPassword(username :string, password : string) {
    return this.http.post(
      this.host + this.partUsers + "reset-password",
      {
        username: username,
        password: password,
      },
      {
        headers: new HttpHeaders()
          .append("ContentType", "application/json")
          .append("Authorization", localStorage.getItem("token")||'TokenNotFound'),
      }
    );
  }

  getUsersAll() {
    return this.http.get(this.host + this.partUsers, {
      headers: new HttpHeaders()
        .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
        observe: 'response'
    });
  }

  createUser(
    titleName : string,
    firstName : string,
    lastName : string,
    employee_code : string,
    employee_position : string,
    user_role : number,
    email : string,
    phone_number : string,
    username : string,
    password : string
  ) {
    const dataUser = {
      titlename: titleName,
      firstname: firstName,
      lastname: lastName,
      employee_code: employee_code,
      employee_position: employee_position,
      role_id: user_role,
      email: email,
      phone_number: phone_number,
      username: username,
      password: password
    };
    console.log('data for createing', dataUser);
    return this.http.post(
      this.host + this.partUsers,
      JSON.stringify(dataUser),
      {
        headers: new HttpHeaders()
          .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
          .set("Content-Type", "application/json"),
          observe: "response",
      }
    );
  }

  createPersonnel(data: any, imageFile: File) {
    let dataPersonnel = {
      role_id: data["user_role"],
      username: data["username"],
      personnel_id: data["personnel_id"],
      personnel_code: data["personnel_code"],
      titlename: data["titlename"],
      firstname: data["firstname"],
      lastname: data["lastname"],
      address: data["address"],
      date_of_birth: data["date_of_birth"],
      phone_number: data["phone_number"],
      email: data["email"],
      password: data["password1"],
      image_path: "",
    };
    let formData = new FormData();
    for (var key in dataPersonnel) {
      formData.append(key, dataPersonnel[key as keyof typeof dataPersonnel]);
    }
    if (imageFile != null)
      formData.append("personnelImageFile", imageFile, imageFile["name"]);
    return this.http.post(this.host + "/users-account", formData, {
      headers: new HttpHeaders().set(
        "Authorization",
        localStorage.getItem("token") || "TokenNotFound"
      ),
    });
  }


  getMyUserinfo() {
    return this.http.get(this.host + this.partUsers + "my-info", {
      headers: new HttpHeaders()
        .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
    });
  }

  getMyUserinfoStatus() {
    return this.http.get(this.host + this.partUsers + "my-info", {
      headers: new HttpHeaders()
        .set("Authorization", 'Bearer ' + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
      observe: "events",
    });
  }




  getUserlog(username : string) {
    return this.http.get(this.host + this.partUsers + "login_log/" + username, {
      headers: new HttpHeaders()
        .set("Authorization", localStorage.getItem("token")||'TokenNotFound')
        .set("Content-Type", "application/json"),
    });

  }



  getMySidebarMenu() {
    return this.http.get(this.host + this.partUsers + "my-sidebar-menu",{
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
      responseType: 'text',
      observe: 'response'
    });
  }

  getMySidebarMenuByID(id : number) {
    return this.http.get(this.host + this.partUsers + "my-sidebar-menu/" +id, {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
    });
  }


  getmenuPermissionBy(id : number) {
    return this.http.get(this.host + '/system-menu/menuPermission/forUser/'+id, {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + localStorage.getItem("token"))
        .set("Content-Type", "application/json"),
    });
  }
}
