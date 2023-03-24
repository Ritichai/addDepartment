import { SystemMenusService } from "./../../services/system-menus.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import swal from 'sweetalert2';

@Component({
  selector: "app-system-menus-all",
  templateUrl: "./system-menus-all.component.html",
  styleUrls: ["./system-menus-all.component.scss"],
})
export class SystemMenusAllComponent implements OnInit {

  columnsSystemMenuTable: string[] = [
    "menu_path",
    "menu_title",
    "menu_type",
    "menu_icontype",
    "menu_collapse",
    "menu_sequence",
    "menu_disable",
    //"remove",
    // "info",
    "edit",
    "view_sub_menu"
//    "changeType"
  ];


  dataSourceOfSystemMenuTable = new MatTableDataSource<SystemMenuModel>();
  @ViewChild(MatPaginator, {static: true}) MatPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) MatSort!: MatSort;

  constructor(
    private router: Router,
    private systemMenusService: SystemMenusService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.dataSourceOfSystemMenuTable.paginator = this.MatPaginator;
    this.dataSourceOfSystemMenuTable.sort = this.MatSort;
    this.dataSourceOfSystemMenuTable.data = [];





    this.systemMenusService.getSystemMenusAll()
      .subscribe(response => {
        if (response['status'] == 200) {
          this.dataSourceOfSystemMenuTable.data = JSON.parse(JSON.stringify(response.body));
        }
      }), () => {
        console.log('get all system menu fail');
      }, () => {
        console.log('get all system menu complete');
      }
  }



  onChangeTypeMenu(menu_type: boolean, item: SystemMenuModel) {
    item.menu_type = menu_type ? 'link' : 'sub';
    console.log('ทำการเปลียน', item.id + ' ' + item.menu_type);
    if(item.menu_type == 'link'){
      this.systemMenusService.changeSysTemMenuType(item.id, 'sub').subscribe(response => {
        console.log('response ', response);
        if(response['status'] == 200){
          console.log('เปลียนเป็น sub เมนู ', item.id);
          this.ngOnInit();
        }else{
          console.log('ไม่สามารถเปลียนเป็น sub เมนู ', item.id);
        }
      });
    }else{
      this.systemMenusService.changeSysTemMenuType(item.id, 'link').subscribe(response => {
        console.log('response ', response);
        if(response['status'] == 200){
          console.log('เปลียนเป็น link เมนู ', item.id);
          this.ngOnInit();
        }else{
          console.log('ไม่สามารถเปลียนเป็น link เมนู ', item.id);
        }
      });
    }
  }

  viewSubMenulistByMenuID(item: SystemMenuModel) {
    let menu_path = item.menu_path;
    let id = item.id;
    this.router.navigate(["/system-menus/sub-system-menus/", item.id], { queryParams: { menu_path, id } });
  }



//เช็คเมนู ว่าเปิดหรือปิด
onChangeDisableAndEnable(enable: boolean, item: SystemMenuModel) {
  if (enable) {
    this.enableMenuByID(item);
  } else {
    this.disableMenuByID(item);
  }
}
//ปิดใช้งานเมนู
disableMenuByID(item:SystemMenuModel) {
  this.systemMenusService.disableSystemMenus(item.id).subscribe(response => {
    console.log('response ', response);
    if(response['status'] == 200){
      console.log('ปิดการใช้งานเมนู ', item.id);
      this.ngOnInit();
    }else{
      console.log('ไม่สามารถปิดการใช้งานเมนู ', item.id);
    }
  });
}
//เปิดใช้งานเมนู
enableMenuByID(item:SystemMenuModel) {
  this.systemMenusService.enableSystemMenus(item.id).subscribe(response => {
    console.log('response ', response);
    if(response['status'] == 200){
      console.log('เปิดการใช้งานเมนู ', item.id);
      this.ngOnInit();
    }else{
      console.log('ไม่สามารถเปิดการใช้งานเมนู ', item.id);
    }
  });

}

  createNewMenu() {
    this.router.navigateByUrl('/system-menus/create-new-menu');
  }

  // deleteMenu(item: SystemMenuModel) {
  //   swal({
  //     title: 'ลบเมนู',
  //     text: 'คุณต้องการลบ' + item.menu_path + ' จริงหรือไม่ ?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#f44336',
  //     confirmButtonText: 'ลบ',
  //     cancelButtonText: 'ยกเลิก',
  //   }).then((result) => {
  //     if (result['value']) {
  //       this.systemMenusService.deleteSystemMenus(item.id)
  //         .subscribe(response => {
  //           if (response['status'] == 200) {
  //             swal({
  //               title: 'สำเร็จ!',
  //               text: 'ลบเมนูระบบเรียบร้อยแล้ว',
  //               type: 'success',
  //               showConfirmButton: false,
  //               timer: 1500
  //             }).then((result) => {
  //               this.ngOnInit();
  //             })
  //           }
  //         }), (err) => {
  //           console.log('delete system menu fail ', err);
  //         }, () => {
  //           console.log('delete system menu complete');
  //         }
  //     }
  //   })
  // }

  getMenusByid(item: SystemMenuModel) {
    console.log('getMenusByid', item);
  }

  editMenusByid(item: SystemMenuModel) {
    this.router.navigateByUrl('/system-menus/editMenu/' + item.id);
  }

}


export interface SystemMenuModel {
  id: number;
  menu_path: string;
  menu_title: string;
  menu_type: string;
  menu_icontype: string;
  menu_collapse: string;
  menu_sequence: number;
  menu_disable: string;
}
