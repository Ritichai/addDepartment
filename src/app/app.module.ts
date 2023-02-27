import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    NgbPaginationModule,
    NgbAlertModule
  ],
  declarations: [
    PageNotFoundComponent
  ]
})
export class NgBootstrapModule { }

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule
  ]
})
export class MaterialModule { }

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { MemberLayoutComponent } from './layouts/member-layout/member-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GuestLayoutComponent,
    MemberLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
