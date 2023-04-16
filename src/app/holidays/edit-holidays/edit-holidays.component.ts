import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidaysService } from 'src/app/services/holidays.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit-holidays',
  templateUrl: './edit-holidays.component.html',
  styleUrls: ['./edit-holidays.component.scss']
})
export class EditHolidaysComponent {

  holiday_info: any;
  holiday_id: any;
  form: FormGroup = new FormGroup({
    holiday_date: new FormControl(''),
    holiday_name: new FormControl(''),
    holiday_year: new FormControl(''),
  });
  submitted = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private holidaysService: HolidaysService
  ) {
    this.holiday_info = {
      holiday_date: '',
      holiday_name: '',
      holiday_year: '',
    };

    this.form = this.formBuilder.group({
      holiday_date: ["", Validators.required],
      holiday_name: ["", Validators.required],
      holiday_year: ["",Validators.required,],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const holiday_id = params['id']; // หรือ params.id
      if (holiday_id == undefined) {
        return;
      }
      console.log(holiday_id);
      this.holidaysService.getHolidayById(holiday_id).subscribe((res: any) => {
        this.holiday_id = params['id'];
        if (res.status == 201) {
          this.holiday_info = res.body;
        }
      },
        (error) => {
          console.log(error);
        }
      )
    });
  }

editHolidayData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.holidaysService.editHolidayData(
    this.holiday_id,
    this.form.value['holiday_date'],
    this.form.value['holiday_name'],
    this.form.value['holiday_year'],
    ).subscribe((res: any) => {
      console.log(res);
      if (res.status == 201) {
        swal.fire({
          title: 'สำเร็จ',
          text: res.body.message,
          icon: 'success',
          confirmButtonAriaLabel: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/holidays/dashboard');
        })
      }
    })
}
onDateChange(event: any) {
  const year = new Date(event.target.value).getFullYear();
  this.form.controls['holiday_year'].setValue(year);
}
  cancel() {
    this.router.navigateByUrl('/holidays/dashboard');
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  disableInput() {
    this.form.controls['holiday_year'].disable();
  }
}
