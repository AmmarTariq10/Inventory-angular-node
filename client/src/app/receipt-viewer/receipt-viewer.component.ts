import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-receipt-viewer',
  templateUrl: './receipt-viewer.component.html',
  styleUrls: ['./receipt-viewer.component.css']
})
export class ReceiptViewerComponent implements OnInit {

  receipt = [];
  tempSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ReceiptViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData,
    private matSnackBar: MatSnackBar,
    private sales: SalesService) { }

  ngOnInit() {
    this.retreiveProperReceipt();
  }

  retreiveProperReceipt() {
    this.tempSub = this.sales.getReceiptForSale(this.injectedData).subscribe(data => {
      if (data.error) {
        this.matSnackBar.open('An error occured', 'close');
        console.log(data.message);
      } else {
        this.injectedData[0].receipt = JSON.parse(this.injectedData[0].receipt);
        this.renderReceipt(data.message);
      }
    });
  }

  renderReceipt(res) {
    this.receipt = res.map(s => {
      this.injectedData[0].receipt[s.iid].product = s;
      return this.injectedData[0];
    });
    const OldData = this.injectedData[0].receipt;
    this.injectedData[0].receipt = [];
    Object.keys(OldData).forEach(k => {
      this.injectedData[0].receipt.push(OldData[k]);
    });
  }

  closeDialogRef() {
    this.dialogRef.close();
  }
}
