
import { SystemMenuPermissionAllComponent } from './system-menu-permission-all/system-menu-permission-all.component';
import { SystemSubmenusAllComponent } from './system-submenus-all/system-submenus-all.component';
import { Component } from '@angular/core';
import {Routes} from '@angular/router';
import { SystemMenusAllComponent } from './system-menus-all/system-menus-all.component';
import { CreateSystemMenusComponent } from './create-system-menus/create-system-menus.component';
import { EditSystemMenusComponent } from './edit-system-menus/edit-system-menus.component';
import { CreateSubMenuFormComponent } from './create-sub-menu-form/create-sub-menu-form.component';

export const SystemMenusRoutes: Routes = [
  {
    path: 'menu-setting',
    component: SystemMenusAllComponent
  },
  {
    path: 'create-new-menu',
    component: CreateSystemMenusComponent
  },
  {
    path: 'editMenu/:id',
    component: EditSystemMenusComponent
  },
  {
    path:'sub-system-menus/:id',
    component: SystemSubmenusAllComponent
  },
  {
    path: 'sub-system-menus/:id/create-new-sub-menu',
    component: CreateSubMenuFormComponent
  },
  {
    path: 'system-menu-permissions',
    component: SystemMenuPermissionAllComponent
  },


];
