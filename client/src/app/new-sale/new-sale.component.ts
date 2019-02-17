import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';
import { NewSaleService } from '../new-sale.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {

  showInvItems = [];
  invItems = [];
  itemsList = [];
  itemsInList = [];
  listMap: any = {};
  totalBill: any = 0;
  tempSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(private dialogRef: MatDialogRef<NewSaleComponent>, private home: HomeService, private matSnackBar: MatSnackBar, private newSale: NewSaleService) { }

  ngOnInit() {
    this.getInventoryItems();
  }

  getInventoryItems() {
    this.tempSub = this.home.getInventoryItems().subscribe(data => {
      if (data.error) {
        console.log(data.message);
        this.matSnackBar.open('An error occured', 'close');
      } else {
        this.invItems = data.message.filter(i => {
          if (i.quantity > 0) {
            return i;
          }
        });
        this.showInvItems = this.invItems;
      }
    });
  }

  closeDialogRef() {
    this.dialogRef.close();
  }

  addToList(index, idNo) {
    const id = idNo.substr(1);
    if (!(this.itemsInList.includes(id))) {
      this.itemsList.push(this.invItems[index]);
      this.itemsInList.push(id);
    } else {
      this.matSnackBar.open('Item Already in list', 'close');
    }
  }

  removeFromList(index) {
    const idIndex = this.itemsInList.indexOf(parseInt(this.itemsList[index].iid, 10).toString());
    delete this.listMap[this.itemsList[index].iid];
    this.itemsList.splice(index, 1);
    this.itemsInList.splice(idIndex, 1);
    this.reimburseTotal();
  }

  reimburseTotal() {
    this.totalBill = '...';
    const newTotArr = Object.keys(this.listMap).map(o => {
      return this.listMap[o].cost;
    });
    try {
      this.totalBill = newTotArr.reduce((accumulator, currentValue) => accumulator + currentValue);
    } catch (exc) {
      this.totalBill = 0;
    }
  }

  changeBill(index, inputId) {
    const inp = <HTMLInputElement>document.getElementById(inputId);
    const max: any = parseInt(inp.max, 10);
    let quant: any = parseInt(inp.value, 10);
    if (quant === '' || isNaN(quant)) {
      const thisItemZ = this.itemsList[index];
      // if (this.listMap.hasOwnProperty(thisItem.iid)) {
      this.listMap[thisItemZ.iid] = {
        stock: max,
        quantity: 0,
        cost: 0
      };
      this.reimburseTotal();
      return false;
    }
    inp.value = quant;
    if (quant > max) {
      this.matSnackBar.open(`The remaining stock for this items is only ${max}`, 'close');
      quant = max;
      inp.value = max;
    }
    const thisItem = this.itemsList[index];
    // if (this.listMap.hasOwnProperty(thisItem.iid)) {
    this.listMap[thisItem.iid] = {
      name: thisItem.name,
      stock: max,
      quantity: quant,
      cost: quant * parseInt(thisItem.price, 10)
    };
    // }
    this.reimburseTotal();
  }

  generateSale() {
    if (Object.keys(this.listMap).length > 0) {
      this.tempSub = this.newSale.generateReceipt({
        total: this.totalBill,
        receipt: this.listMap
      }).subscribe(data => {
        if (data.error) {
          console.log(data.message);
          this.matSnackBar.open('An error occured', 'close');
        } else {
          this.matSnackBar.open(`You have made a sale of PKR ${this.totalBill}`, 'close');
          this.itemsList = [];
          this.listMap = [];
          this.itemsInList = [];
          this.reimburseTotal();
          this.getInventoryItems();
          // this.dialogRef.close();
        }
      });
    }
  }

  sortInvItems(searchInp) {
    const val = searchInp.value.toLowerCase();
    if (val === '') {
      this.showInvItems = this.invItems;
    } else {
      this.showInvItems = this.invItems.filter(i => {
        if (i.name.toLowerCase().match(val) !== null) {
          return i;
        }
      });
    }
  }

}
