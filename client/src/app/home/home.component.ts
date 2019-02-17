import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as $ from 'jquery';
import { InvEditComponent } from '../inv-edit/inv-edit.component';
import { InvAddComponent } from '../inv-add/inv-add.component';
import { NewSaleComponent } from '../new-sale/new-sale.component';
import { ReceiptViewerComponent } from '../receipt-viewer/receipt-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invArr = [];
  salesArr = [];

  tempSub: Subscription;
  tempSubSec: Subscription;

  constructor(private home: HomeService, private matSnackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getInventory();
    this.getSales();
  }

  getInventory() {
    this.tempSub = this.home.getInventoryItems().subscribe(data => {
      if (data.error) {
        console.log(data.message);
        this.matSnackBar.open('An error occured', 'close');
      } else {
        this.parseInventoryOnInit(data.message);
        this.tempSub.unsubscribe();
      }
    });
  }

  getSales() {
    this.tempSubSec = this.home.getSales().subscribe(data => {
      if (data.error) {
        console.log(data.message);
        this.matSnackBar.open('An error occured', 'close');
      } else {
        this.parseSalesOnInit(data.message);
        this.tempSubSec.unsubscribe();
      }
    });
  }

  parseSalesOnInit(res) {
    this.salesArr = res.map(r => {
      const dup = r;
      dup.time = new Date(r.time).toLocaleString();
      return dup;
    });
  }

  parseInventoryOnInit(res) {
    this.invArr = res;
  }

  editInvItem(editId) {
    const editDialogRef = this.dialog.open(InvEditComponent, {
      'height': '75%',
      'width': '50%',
      data: editId
    });
    editDialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  deleteInvItem(delId) {
    this.tempSub = this.home.delInvItem(delId).subscribe(data => {
      if (data.error) {
        console.log(data.message);
        this.matSnackBar.open('An error occured', 'close');
      } else {
        this.invArr = this.invArr.filter(i => {
          if (i.iid !== parseInt(delId, 10)) {
            return i;
          }
        });
        // $(`.inv-${delId}-component`).remove();
        this.tempSub.unsubscribe();
      }
    });
  }

  addInvItem() {
    const addDialogRef = this.dialog.open(InvAddComponent, {
      'height': '70%',
      'width': '50%'
    });
    // addDialogRef.afterOpened().subscribe(() => {
    //   document.getElementById('add-name-inp').click();
    // });

    addDialogRef.afterClosed().subscribe(() => {
      this.getInventory();
    });
  }

  makeASale() {
    const newSaleDialogRef = this.dialog.open(NewSaleComponent, {
      'height': '97%',
      'width': '97%'
    });
    newSaleDialogRef.afterClosed().subscribe(() => {
      this.getInventory();
      this.getSales();
    });
  }

  viewReceipt(sid) {
    const salesData = this.salesArr.filter(s => {
      if (s.sid === parseInt(sid, 10)) {
        return s;
      }
    });
    const receiptVewerRef = this.dialog.open(ReceiptViewerComponent, {
      'height': '97%',
      'width': '30%',
      data: salesData
    });
  }
}
