import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays.routing';
import { HolidaysDashboardComponent } from './holidays-dashboard/holidays-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CreateNewHolidaysComponent } from './create-new-holidays/create-new-holidays.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditHolidaysComponent } from './edit-holidays/edit-holidays.component';


@NgModule({
  declarations: [
    HolidaysDashboardComponent,
    CreateNewHolidaysComponent,
    EditHolidaysComponent
  ],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class HolidaysModule { }
