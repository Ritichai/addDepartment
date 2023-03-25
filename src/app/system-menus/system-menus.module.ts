import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { SystemMenusRoutes } from './system-menus.routing';
import { CreateSubMenuFormComponent } from './create-sub-menu-form/create-sub-menu-form.component';
import { CreateSystemMenuPermissionComponent } from './create-system-menu-permission/create-system-menu-permission.component';
import { CreateSystemMenusComponent } from './create-system-menus/create-system-menus.component';
import { EditSystemMenusComponent } from './edit-system-menus/edit-system-menus.component';
import { SystemMenuPermissionAllComponent } from './system-menu-permission-all/system-menu-permission-all.component';
import { SystemMenusAllComponent } from './system-menus-all/system-menus-all.component';
import { SystemSubmenusAllComponent } from './system-submenus-all/system-submenus-all.component';


@NgModule({
  declarations: [
    CreateSubMenuFormComponent,
    CreateSystemMenuPermissionComponent,
    CreateSystemMenusComponent,
    EditSystemMenusComponent,
    SystemMenuPermissionAllComponent,
    SystemMenusAllComponent,
    SystemSubmenusAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SystemMenusRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatListModule
  ]
})
export class SystemMenusModule { }
