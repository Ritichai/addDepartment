import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SaleManagementService } from 'src/app/services/sale-management.service';
import { SaleDepartmentService } from 'src/app/services/sale-department.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-department-for-sale',
  templateUrl: './add-department-for-sale.component.html',
  styleUrls: ['./add-department-for-sale.component.scss']
})
export class AddDepartmentForSaleComponent {
  sale_departments: any;
  sale_id: any;
  form: FormGroup = new FormGroup({
    department_id: new FormControl('')
  });
  submitted = false;

  constructor(
    private router: Router,
    private SaleManagementService: SaleManagementService,
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private SaleDepartmentService: SaleDepartmentService
  ) {
    this.form = this.FormBuilder.group({
      department_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.sale_id = parseInt(atob(params['id']));
    });
    this.SaleDepartmentService.getSaleDepartment().subscribe((res: any) => {
      this.sale_departments = res.body;
      console.log(this.sale_departments);
    });
  }


  addDepartmentForSale() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.SaleManagementService.setDepartmentForSaleBySaleID(
      this.sale_id,
      this.form.value['department_id'],
    ).subscribe((res: any) => {
      if (res.status == 201) {
        swal.fire({
          title: 'สำเร็จ',
          text: res.body.message,
          icon: 'success',
          confirmButtonAriaLabel: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/sale-management/dashboard');
        }
        );
      }
    })
  }
  cancel() {
    this.router.navigateByUrl('/sale-management/dashboard');
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
