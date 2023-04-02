import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customers.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-customer-form',
  templateUrl: './edit-customer-form.component.html',
  styleUrls: ['./edit-customer-form.component.scss']
})
export class EditCustomerFormComponent implements OnInit {
  customerId: number | undefined;
  customerInfo: any = {
    customer_code: '',
    customer_name: '',
    customer_province: '',
    customer_group: '',
  }

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.customerId = params['customer_id'];
      if (this.customerId == undefined) {
        return;
      }

      this.customerService.getCustomerById(this.customerId).subscribe((response) => {
        if (response['status'] == 200 || response['status'] == 201) {
          this.customerInfo = response['body'];
        } else {
          console.log('fail');
        }
      }, (err) => {
        console.log('get a customer info for edit fail', err);
      }, () => {
        console.log('get a customer info for edit complete.', this.customerInfo);
      });
    });
  }

  cancel() {
    this.router.navigateByUrl('/customers');
  }

  onSubmit(form: any) {
    if (this.customerId == undefined) {
      return;
    }

    this.customerService.updateCustomer(
      this.customerId,
      this.customerInfo.customer_code,
      this.customerInfo.customer_name,
      this.customerInfo.customer_province,
      this.customerInfo.customer_group,
    ).subscribe((response: any) => {
      if (response['status'] == 200 || response['status'] == 201) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'แก้ไขข้อมูล Customer เรียบร้อยแล้ว',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/customers');
          }
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถแก้ไขข้อมูล Customer ได้',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        });
      }
    }, (err: any) => {
      console.log('update customer fail', err);
    }, () => {
      console.log('update customer complete.');
    });
  }
}
