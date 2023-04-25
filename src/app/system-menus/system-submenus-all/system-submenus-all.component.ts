import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemMenusService } from "./../../services/system-menus.service";

@Component({
  selector: 'app-system-submenus-all',
  templateUrl: './system-submenus-all.component.html',
  styleUrls: ['./system-submenus-all.component.scss']
})
export class SystemSubmenusAllComponent implements OnInit {

  columnsSubSystemMenuTable: string[] = [
    //"sub_parent_id",
    "sub_sequence",
    "sub_path",
    "sub_title",
    "sub_ab",
    "sub_enabled"
  ];
  id:string

  dataSourceOfSubSystemMenuTable = new MatTableDataSource<SystemSubMenuModel>();
  @ViewChild(MatPaginator, {static: true}) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) MatSort!: MatSort;

  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private activeRoute : ActivatedRoute
  ) {
    this['id']= this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.dataSourceOfSubSystemMenuTable.paginator = this.MatPaginator;
    this.dataSourceOfSubSystemMenuTable.sort = this.MatSort;
    this.dataSourceOfSubSystemMenuTable.data = [];

    const Menu_id = this.activeRoute.snapshot.params['id'];
    this.systemMenusService.getallSubMenus(Menu_id).subscribe(response => {
      if (response['status'] == 200) {
        this.dataSourceOfSubSystemMenuTable.data = JSON.parse(JSON.stringify(response.body));
        //console.log(this.dataSourceOfSubSystemMenuTable.data)
      } else {
       // console.log("ไม่มี Sub Menu ในระบบ");
      }
    }),() => {
     // console.log("get all system menu fail");
    },() => {
    //  console.log("Complete");
    };
  }

  clickCreateNewSubMenu() {
    this.router.navigate(['system-menus','sub-system-menus', this.activeRoute.snapshot.params['id'], 'create-new-sub-menu']);
  }

  onChangeDisableAndEnable(enable :number, id: number) {
   // console.log(enable);
   // console.log(id);
    if (enable == 1) {
      this.systemMenusService.setSubMenuEnabled(0, id).subscribe(response => {
        if (response['status'] == 200) {
          //console.log(response);
          this.ngOnInit();
        }
      }), () => {
       // console.log("Set Sub Menu Enabled 0 Fail");
      }, () => {
      //  console.log("Complete");
      }
    } else{
      this.systemMenusService.setSubMenuDisable(1, id).subscribe(response => {
        if (response['status'] == 200) {
          //console.log(response);
          this.ngOnInit();
        }
      }), () => {
     //   console.log("Set Sub Menu Enabled 1 Fail");
      }, () => {
     //   console.log("Complete");
      }
    }
  }


}
export interface SystemSubMenuModel {
  id: number,
  sub_parent_id: number,
  sub_sequence: number,
  sub_path: string,
  sub_title: string,
  sub_ab: string,
  sub_enabled: number,
}
