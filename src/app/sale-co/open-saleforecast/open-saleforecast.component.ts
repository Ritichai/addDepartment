import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaleCoService } from 'src/app/services/saleco.service';


@Component({
  selector: 'app-open-saleforecast',
  templateUrl: './open-saleforecast.component.html',
  styleUrls: ['./open-saleforecast.component.scss']
})
export class OpenSaleforecastComponent {

  form: FormGroup = new FormGroup({
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    sale_co_type: new FormControl(''),
    leadtime: new FormControl(''),
  });
  submitted = false;

  sale_co_type = [
    { id: 1, type_name: 'วัตถุดิบ' },
    { id: 2, type_name: 'อนุมัติ' },
    { id: 3, type_name: 'ปรับ' },
  ]

  start_date: any;
  end_date: any;
  leadtime: any;




  constructor(
    public dialogRef: MatDialogRef<OpenSaleforecastComponent>,
    public saleCoService: SaleCoService,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }




  opneSaleForeCast(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.saleCoService.openSaleForeCastById(
      this.data.id,
      this.form.value["end_date"],
      this.form.value["sale_co_type"],
    ).subscribe((res: any) => {
      console.log(res)
      this.dialogRef.close();

    }), (err: any) => {
      console.log(err)
    }
  }


  ngOnInit(): void {
    this.start_date = this.getCurrentDateString();
    this.form = this.formBuilder.group({
      start_date: [this.start_date, Validators.required],
      end_date: ["", Validators.required],
      sale_co_type: ["", Validators.required],
      leadtime: ["", Validators.required],
    })
  }



  //เปิด Form
  closeDialog(): void {
    this.dialogRef.close();
  }
  // ทำให้ start_date เป็นวันที่ปัจจุบัน
  getCurrentDateString(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  //ใช้คำนวณวันที่ โดยใช้ start_date กับ leadtime + กันจะได้ end_date
  calculateTime() {
    if (this.start_date && this.leadtime) {
      const startDate = new Date(this.start_date);
      const leadTimeInMilliseconds = this.leadtime * (1000 * 60 * 60 * 24);
      const endDate = new Date(startDate.getTime() + leadTimeInMilliseconds);
      this.end_date = this.dateToString(endDate);
    } else {
      this.end_date = null;
    }
  }


  dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
