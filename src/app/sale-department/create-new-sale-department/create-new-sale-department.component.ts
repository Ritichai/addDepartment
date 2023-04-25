import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaleDepartmentService } from 'src/app/services/sale-department.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-sale-department',
  templateUrl: './create-new-sale-department.component.html',
  styleUrls: ['./create-new-sale-department.component.scss']
})
export class CreateNewSaleDepartmentComponent {

  constructor(
    private router: Router,
    private saleDepartmentService: SaleDepartmentService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      sale_department_name: ['', Validators.required],
    });
  }
  form: FormGroup = new FormGroup({
    sale_department_name: new FormControl(''),
  });
  submitted = false;

  cancel() {
    this.router.navigateByUrl('/sale-department/dashboard');
  }
  createSaleDepartment() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.saleDepartmentService.createNewSaleDepartment(
      this.form.value['sale_department_name'],
    ).subscribe((res: any) => {
      console.log(res);
      if(res.status === 200) {
        swal.fire({
          title: 'Error',
          text: res.body.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }else if(res.status === 201) {
        swal.fire({
          title: 'Success',
          text: res.body.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl('/sale-department/dashboard');
        });
      }
    });
  }

  ngOnInit() {
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}

