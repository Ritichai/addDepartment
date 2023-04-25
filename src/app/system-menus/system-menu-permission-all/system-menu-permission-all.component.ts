import { SystemMenusService } from './../../services/system-menus.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRoleManagementService } from '../../services/user-role-management.service';
@Component({
  selector: 'app-system-menu-permission-all',
  templateUrl: './system-menu-permission-all.component.html',
  styleUrls: ['./system-menu-permission-all.component.scss']
})
export class SystemMenuPermissionAllComponent implements OnInit {

  columnsSystemMenuPermissionTable: string[] = [
    "role_id",
    "set_permission",
  ];

  columnsSystemMenuTable: string[] = [
    "menu_path"
  ];
  role_id: number = 0;
  activeElementId: number | undefined;

  dataSourceOfSystemMenuPermissionTable = new MatTableDataSource<SystemMenuPermissionModel>();
  dataMenuByRoleID = new MatTableDataSource<SystemMenuModel>();
  @ViewChild(MatPaginator, {static: true}) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) MatSort!: MatSort;
    constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private userRoleManagementService: UserRoleManagementService,
  ) { }

  ngOnInit(): void {

    this.dataSourceOfSystemMenuPermissionTable.paginator = this.MatPaginator;
    this.dataSourceOfSystemMenuPermissionTable.sort = this.MatSort;
    this.dataSourceOfSystemMenuPermissionTable.data = [];


    this.userRoleManagementService.getRoleList().subscribe((data:any) => {
    //  console.log("data",data);
      if(data.status == 200){
        this.dataSourceOfSystemMenuPermissionTable.data = data.body['roles'].map((role:any) => {
      //    console.log("role",role);
          return {
            role_id: role.id,
            role_name: role.role_name,
          }
        });
      }
    });
  }

  viewMenuByRoleID(item: SystemMenuPermissionModel) {
    const role_id = item.role_id;
    this.activeElementId = role_id;
    this.systemMenusService.getMenuPermissionByRole(item.role_id).subscribe((dataMenuPermission:any) => {

      //  console.log("Click Role ID", item.role_id);
        this.role_id = item.role_id;
      //  console.log("dataMenuPermission", dataMenuPermission.body);
        this.dataMenuByRoleID.data = dataMenuPermission.body['menuList'].map((menuPermission:any) => {
          return {
            system_menu_id: menuPermission.id,
            menu_path: menuPermission.menu_path,
            menu_title: menuPermission.menu_title,
            check_permission_menu: menuPermission.permission,
            subMenus: menuPermission.subMenus.map((subMenu:any) => {
              return{
                system_sub_menu_id: subMenu.id,
                menu_path: subMenu.sub_title,
                check_permission_menu: subMenu.permission,
              }
            })
          }
        });
      //  console.log("dataMenuByRoleID", this.dataMenuByRoleID.data);
    });
  }

  setPermissionMenu(role_id:number,system_menu_id:number) {
   // console.log("ทำการเพิ่มสิทธิ์เมนู"+system_menu_id+"ให้กับ Role ID"+role_id + "สำเร็จ");
    this.systemMenusService.createSetMenuForRole(role_id,system_menu_id).subscribe(data => {
   //   console.log("data",data);
    });
  }
  unSetPermissionMenu(role_id:number,system_menu_id:number) {
   // console.log("ทำการลบเมนู"+system_menu_id+"ให้กับ Role ID"+role_id + "สำเร็จ");
    this.systemMenusService.deleteSetMenupermission(role_id,system_menu_id).subscribe(data => {
   //   console.log("data",data);
    });
  }

  systemCheckPermissionMenuByToggle(enable: boolean, role_id: number, system_menu_id: number) {
    if (enable) {
      this.setPermissionMenu(role_id, system_menu_id);
    } else {
      this.unSetPermissionMenu(role_id, system_menu_id);
    }
  }



  setPermissionSubMenu(role_id:number,system_sub_menu_id:number) {
 //   console.log("ทำการเพิ่มสิทธิ์เมนูให้ ซัพ เมนู"+system_sub_menu_id+"ให้กับ Role ID"+role_id + "สำเร็จ");
    this.systemMenusService.createPermissionSubMenu(role_id,system_sub_menu_id).subscribe(data => {
  //    console.log("data",data);
    });
  }

  unSetPermissionSubMenu(role_id:number,system_sub_menu_id:number) {
  //  console.log("ทำการลบสิทธิ์ซัพเมนู"+system_sub_menu_id+"ให้กับ Role ID"+role_id + "สำเร็จ");
    this.systemMenusService.deletePermissionSubMenu(role_id,system_sub_menu_id).subscribe(data => {
  //    console.log("data",data);
    });
  }

  systemCheckPermissionSubMenuByToggle(enable: boolean, role_id: number, system_sub_menu_id: number) {
    if (enable) {
      this.setPermissionSubMenu(role_id, system_sub_menu_id);
    } else {
      this.unSetPermissionSubMenu(role_id, system_sub_menu_id);
    }
  }
}



export interface SystemMenuPermissionModel{
  id: number;
  role_id: number;
  system_menu_id: number;
}
export interface SystemMenuModel {
  menu_path: string;
}
