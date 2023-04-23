import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CustomerService } from "../../services/customers.service";
import { CustomerGroupService } from "../../services/customer-group.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";
import {CustomerGroupModel} from "../customers.module";

@Component({
  selector: 'app-create-new-customer-form',
  templateUrl: './create-new-customer-form.component.html',
  styleUrls: ['./create-new-customer-form.component.scss']
})
export class CreateNewCustomerFormComponent implements OnInit {
  customerGroupList: CustomerGroupModel[] = [];

  constructor(
    private customerService: CustomerService,
    private customerGroupService: CustomerGroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerGroupService.getCustomerGroupList().subscribe(
      (data: any) => {
        this.customerGroupList = data.body;
        console.log(data.body);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
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
