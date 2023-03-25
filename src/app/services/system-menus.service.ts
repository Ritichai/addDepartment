import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemMenusService {

  host = environment.HOST_URL;
  partSystemMenus: string = '/system-menu/';
  deleteMenu: string = 'deleteMenu/';
  editMenu: string = 'editMenu/';
  disable: string = 'disableMenu/';

  constructor(private http: HttpClient) {}

  setSubMenuEnabled(enable:number,id: number) {
    return this.http.put(
      this.host + this.partSystemMenus + 'set-sub-menu-enabled/' + id,
      { sub_enabled: enable },
      {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
      });
  }
  setSubMenuDisable(enable:number,id: number) {
    return this.http.put(
      this.host + this.partSystemMenus + 'set-sub-menu-disabled/' + id,
      { sub_enabled: enable },
      {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
      });
  }

  getSubMenuALL() {
    return this.http.get(this.host + this.partSystemMenus + '/subMenu/parent/', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
    });
  }

  getSystemMenusAll() {
    return this.http.get(this.host + this.partSystemMenus, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
    });
  }

  checkMenuPathExists(menuPath: string): Observable<any> {
   return this.http.get(`${this.host + this.partSystemMenus}menuPath/${menuPath}`,{
    headers: new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    .set('Content-Type', 'application/json'),
    observe: 'response',
   })
  }

  disableSystemMenus(id: number) {
    return this.http.put(
      this.host + this.partSystemMenus + 'disableMenu/' + id,
      { menu_disable: 0 },
      {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    )
  }

  enableSystemMenus(id: number) {
    return this.http.put(
      this.host + this.partSystemMenus + 'enableMenu/'+ id,
      { menu_disable: 1 },
      {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    )
  }

  createSystemMenus(
    menu_path : string,
    meun_title : string,
    menu_type : string,
    menu_icontype : string,
    menu_collapse : string
  ){
    const dataSystemMenus = {
      menu_path: menu_path,
      menu_title: meun_title,
      menu_type: menu_type,
      menu_icontype: menu_icontype,
      menu_collapse: menu_collapse
    };
    console.log(dataSystemMenus);
    return this.http.post(
      this.host + this.partSystemMenus,
      JSON.stringify(dataSystemMenus),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
          observe: 'response',
      }
    );
  }


deleteSetMenupermission(role_id :number,system_menu_id:number){
  return this.http.delete(
    this.host + this.partSystemMenus + 'menu-permission/' + role_id + '/' + system_menu_id, {
      headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
      observe: 'response'
    }
  )
}


  deleteSystemMenus(id: number) {
    return this.http.delete(
      this.host + this.partSystemMenus + this.deleteMenu + id, {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        observe: 'response'
      }
    )
  }

  getSystemMenusByID(id: number) {
    return this.http.get(
      this.host + this.partSystemMenus + id , {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        observe: 'response'
      }
    )
  }

  getSysteMenusForEdit(id: number) {
    return this.http.get(
      this.host + this.partSystemMenus  + id,
      {
        headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
        observe: 'response'
      }
    )
  }

  editSystemMenus(
    menu_path : string,
    menu_title : string,
    menu_type : string,
    menu_icontype : string,
    menu_collapse : string,
    id: number
  ){
    const dataSystemMenus = {
      menu_path: menu_path,
      menu_title: menu_title,
      menu_type: menu_type,
      menu_icontype: menu_icontype,
      menu_collapse: menu_collapse,
      id: id
    };
    return this.http.put(
      this.host + this.partSystemMenus + this.editMenu + id,
      JSON.stringify(dataSystemMenus),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
          observe: 'response',
      }
    );
  }

  changeSysTemMenuType(id :number, menu_type:string) {
    const dataTypeMenu ={
      menu_type: menu_type,
      id:id
    };
    return this.http.put(
      this.host + this.partSystemMenus + 'changeMenuType/'+ id,
      JSON.stringify(dataTypeMenu),
      {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
        observe: 'response',
      }
    )
  }

  getallSubMenus(id: number) {
    return this.http.get(this.host + this.partSystemMenus +'subMenu/parent/'+id,{
      headers: new HttpHeaders()
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
        .append('Content-Type', 'application/json'),
        observe: 'response',
    });
  }

  getViewAllPerMission(){
    return this.http.get(this.host+this.partSystemMenus+'menuPermission/viewallpermission',{
      headers: new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Content-Type', 'application/json'),
      observe: 'response',
    })

  }

  createSetMenuForRole(role_id :number,system_menu_id:number){
    const dataMenuForRole = {
      role_id: role_id,
      system_menu_id: system_menu_id
    };
    return this.http.post(
      this.host + this.partSystemMenus + 'menuPermission/setMenuForRole',
      JSON.stringify(dataMenuForRole),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set('Content-Type', 'application/json'),
          observe: 'response',
      }
    );
  }


  getUserRolemanagement(){
    return this.http.get(this.host+'/user-role-management',{
      headers: new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Content-Type', 'application/json'),
      observe: 'response',
    })
  }
  createSubMenuForm(
    sub_parent_id :number,
    sub_sequence :number,
    sub_path :string,
    sub_title :string,
    sub_ab :string,
    sub_type:string
  ){
    const dataSubMenu = {
      sub_sequence: sub_sequence,
      sub_path: sub_path,
      sub_title: sub_title,
      sub_ab: sub_ab,
      sub_type: sub_type
    };
    return this.http.post(
      this.host + this.partSystemMenus + 'subMenu/'+sub_parent_id+'/create',
      JSON.stringify(dataSubMenu),
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('Content-Type', 'application/json'),
          observe: 'response',
      }
    );
  }
  getMenuPermissionByRole(role_id :number){
    return this.http.get(this.host+this.partSystemMenus+'menu-permission-by-role/'+role_id,{
      headers: new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Content-Type', 'application/json'),
      observe: 'response',
    })
  }

getSubMenuPermissionByRole(role_id :number, sub_menu_ids: number | number[]) {
  if (!Array.isArray(sub_menu_ids)) {
    sub_menu_ids = [sub_menu_ids]; // convert to array if not already an array
  }
  const data = sub_menu_ids.map(id => ({ role_id, system_sub_menus_id: id }));
  const subMenuIdParam = sub_menu_ids.join(',');
  return this.http.get(`${this.host}${this.partSystemMenus}sub-menu-permission/${role_id}/${subMenuIdParam}`, {
    headers: new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Content-Type', 'application/json'),
    observe: 'response'
  });
}


createPermissionSubMenu(role_id :number, sub_menu_id:number) {
    const dataMenuForRole = {
      role_id: role_id,
      system_sub_menus_id: sub_menu_id
    };
    return this.http.post(
      this.host + this.partSystemMenus + 'sub-menu-permission',
      dataMenuForRole, // pass the object directly as the body, no need to stringify
      {
        headers: new HttpHeaders()
          .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .append('Content-Type', 'application/json'),
        observe: 'response',
      }
    );
  }

  deletePermissionSubMenu(role_id:number,sub_menu_id:number){
    return this.http.delete(this.host+this.partSystemMenus+'sub-menu-permission/'+role_id+'/'+sub_menu_id,{
      headers: new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Content-Type', 'application/json'),
      observe: 'response',
    })
  }
}
