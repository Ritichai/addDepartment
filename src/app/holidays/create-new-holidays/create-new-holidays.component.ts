import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HolidaysService } from '../../services/holidays.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-new-holidays',
  templateUrl: './create-new-holidays.component.html',
  styleUrls: ['./create-new-holidays.component.scss']
})
export class CreateNewHolidaysComponent {


  constructor(
    private holidayService: HolidaysService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      holiday_date: ['', Validators.required],
      holiday_name: ['', Validators.required],
      holiday_year: ['', Validators.required],
    });
  }

  form: FormGroup = new FormGroup({
    holiday_date: new FormControl(''),
    holiday_name: new FormControl(''),
    holiday_year: new FormControl(''),
  });
  submitted = false;

  cancel() {
    this.router.navigateByUrl('/holidays/dashboard');
  }
  onDateChange(event: any) {
    const year = new Date(event.target.value).getFullYear();
    this.form.controls['holiday_year'].setValue(year);
  }
  createHolidays() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }



    this.holidayService.createHolidays(
      this.form.value['holiday_date'],
      this.form.value['holiday_name'],
      this.form.value['holiday_year']
    ).subscribe((res: any) => {
      if (res.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Holiday created successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/holidays/dashboard');
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Holiday creation failed',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
