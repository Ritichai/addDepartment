import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerService } from "../../services/customers.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-new-customer-form',
  templateUrl: './create-new-customer-form.component.html',
  styleUrls: ['./create-new-customer-form.component.scss']
})

export class CreateNewCustomerFormComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigateByUrl('/customers');
  }

  addNewCustomer(form: NgForm) {
    if(form.value['customer_code'] == null || form.value['customer_code'] == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please enter customer code',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.customerService.createNewCustomer(
      form.value['customer_code'],
      form.value['customer_name'],
      form.value['customer_province'],
      form.value['customer_group'],
    ).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'New customer added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/customers');
          }
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add new customer',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
