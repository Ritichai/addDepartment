import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-saleforecast',
  templateUrl: './open-saleforecast.component.html',
  styleUrls: ['./open-saleforecast.component.scss']
})
export class OpenSaleforecastComponent {
  constructor(
    public dialogRef: MatDialogRef<OpenSaleforecastComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  sale_co_type = [
    { id: 1, type_name: 'วัตถุดิบ' },
    { id: 2, type_name: 'อนุมัติ' },
    { id: 3, type_name: 'ปรับ' },
  ]

  start_date:any;
  end_date:any;
  leadtime:any;

  closeDialog(): void {
    this.dialogRef.close();
  }


  calculateTime(){
    if(this.start_date && this.end_date){
      const startdate = new Date(this.start_date);
      const enddate = new Date(this.end_date);
      const timeDifference  = enddate.getTime() - startdate.getTime();
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      this.leadtime = daysDifference;
    }else{
      this.leadtime = null;
    }
  }
}
