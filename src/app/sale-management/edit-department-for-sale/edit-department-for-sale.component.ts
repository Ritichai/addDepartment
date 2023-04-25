import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleDepartmentService } from 'src/app/services/sale-department.service';
import { SaleManagementService } from 'src/app/services/sale-management.service';

@Component({
  selector: 'app-edit-department-for-sale',
  templateUrl: './edit-department-for-sale.component.html',
  styleUrls: ['./edit-department-for-sale.component.scss']
})
export class EditDepartmentForSaleComponent {


  sale_id: any;
  sale_departments: any;
  sale_department_id: any;
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

    //
    this.SaleDepartmentService.getSaleDepartment().subscribe((res: any) => {
      this.sale_departments = res.body;
      console.log(this.sale_departments);
    });

    this.SaleManagementService.getUserRoleSaleByID(this.sale_id).subscribe((res: any) => {
      this.sale_department_id = res.body.user_sale.department_id;
      console.log(this.sale_department_id);
    });

  }

  cancel() {
    this.router.navigateByUrl('/sale-management/dashboard');
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
