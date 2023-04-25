import { SaleDepartmentService } from './../../services/sale-department.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-sale-department',
  templateUrl: './edit-sale-department.component.html',
  styleUrls: ['./edit-sale-department.component.scss']
})
export class EditSaleDepartmentComponent {
  sale_department_id = 0;
  saleDepart_info: any;
  form: FormGroup = new FormGroup({
    sale_department_name: new FormControl(''),
  });
  submitted = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private saleDepartmentService: SaleDepartmentService
  ) {
    this.saleDepart_info = {
      sale_department_name: '',
    };

    this.form = this.formBuilder.group({
      sale_department_name: ["", Validators.required],
    });
  }


ngOnInit(): void {
  this.activatedRoute.params.subscribe((params) => {
    this.sale_department_id = params['sale_department_id'];
    if (this.sale_department_id == undefined) {
      return;
    }
    this.saleDepartmentService.getSaleDepartmentById(this.sale_department_id).subscribe((res: any) => {
      if (res.status == 201) {
        this.saleDepart_info = res.body;
        //console.log(this.saleDepart_info);
      }
    });
  });
}

editSaleDepartment(){
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  this.saleDepartmentService.editSaleDepartment(
    this.sale_department_id,
    this.saleDepart_info.sale_department_name,
  ).subscribe((res: any) => {

    if (res.status == 201) {
      swal.fire({
        title: 'สำเร็จ',
        text: res.body.message,
        icon: 'success',
        confirmButtonAriaLabel: 'OK'
      }).then(() => {
        this.router.navigateByUrl('/sale-department/dashboard');
      })
    }else{
      swal.fire({
        title: 'ไม่สำเร็จ',
        text: res.body.message,
        icon: 'error',
        confirmButtonAriaLabel: 'OK'
      })
    }
  });
}
cancel() {
  this.router.navigateByUrl('/sale-department/dashboard');
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
}
