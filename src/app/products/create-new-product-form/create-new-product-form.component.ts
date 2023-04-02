import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-create-new-product-form',
  templateUrl: './create-new-product-form.component.html',
  styleUrls: ['./create-new-product-form.component.scss']
})

export class CreateNewProductFormComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigateByUrl('/products');
  }

  addNewProduct(form: NgForm) {
    if(form.value['product_code'] == null || form.value['product_code'] == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please enter product code',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if(form.value['price'] == null || form.value['price'] == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Please enter product price',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.productService.createNewProduct(
      form.value['category'],
      form.value['group'],
      form.value['product_code'],
      form.value['trade_name'],
      form.value['common_name'],
      form.value['packing'],
      form.value['size'],
      form.value['pack_qty'],
      form.value['product_unit'],
      form.value['price'],
    ).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'New product added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/products');
          }
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add new product',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
