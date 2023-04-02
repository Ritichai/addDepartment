import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent implements OnInit {
  productId: number | undefined;
  productInfo: any = {
    category: '',
    group: '',
    product_code: '',
    trade_name: '',
    common_name: '',
    packing: '',
    size: '',
    pack_qty: '',
    product_unit: '',
    price: 0,
  }

  constructor(
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['product_id'];
      if (this.productId == undefined) {
        return;
      }

      this.productService.getProductById(this.productId).subscribe((response) => {
        if (response['status'] == 200 || response['status'] == 201) {
          this.productInfo = response['body'];
        } else {
          console.log('fail');
        }
      }, (err) => {
        console.log('get a product info for edit fail', err);
      }, () => {
        console.log('get a product info for edit complete.', this.productInfo);
      });
    });
  }

  cancel() {
    this.router.navigateByUrl('/products');
  }

  onSubmit(form: any) {
    if (this.productId == undefined) {
      return;
    }

    this.productService.updateProduct(
      this.productId,
      this.productInfo.category,
      this.productInfo.group,
      this.productInfo.product_code,
      this.productInfo.trade_name,
      this.productInfo.common_name,
      this.productInfo.packing,
      this.productInfo.size,
      this.productInfo.pack_qty,
      this.productInfo.product_unit,
      this.productInfo.price
    ).subscribe((response) => {
      if (response['status'] == 200 || response['status'] == 201) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'แก้ไขข้อมูล Product เรียบร้อยแล้ว',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/products');
          }
        });
      } else {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถแก้ไขข้อมูล Product ได้',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง'
        });
      }
    }, (err) => {
      console.log('update product fail', err);
    }, () => {
      console.log('update product complete.');
    });
  }
}
