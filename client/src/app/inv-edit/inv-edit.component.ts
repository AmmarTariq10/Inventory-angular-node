import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvEditService } from '../inv-edit.service';
import { Subscription } from 'rxjs';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-inv-edit',
  templateUrl: './inv-edit.component.html',
  styleUrls: ['./inv-edit.component.css']
})
export class InvEditComponent implements OnInit {

  editInv: FormGroup;
  tempSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<InvEditComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedData,
    private fb: FormBuilder,
    private invEdit: InvEditService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.editInv = this.fb.group({
      iid: [{ value: this.injectedData, disabled: true }, [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      price: ['', [
        Validators.required
      ]],
      quantity: ['', [
        Validators.required
      ]]
    });
    this.getItemInfo();
  }

  getItemInfo() {
    this.tempSub = this.invEdit.getInvItem(this.injectedData).subscribe(data => {
      if (data.error) {
        this.matSnackBar.open(data.message, 'close');
      } else {
        // console.log(data.message);
        this.editInv.controls['name'].patchValue(data.message[0].name);
        this.editInv.controls['price'].patchValue(data.message[0].price);
        this.editInv.controls['quantity'].patchValue(data.message[0].quantity);
        this.tempSub.unsubscribe();
      }
    });
  }

  closeDialogRef() {
    this.dialogRef.close();
  }

  editInvItem() {
    if (this.editInv.valid) {
      const val = this.editInv.value;
      val.iid = this.editInv.controls['iid'].value;
      this.tempSub = this.invEdit.editInvItem(val).subscribe(data => {
        if (data.error) {
          console.log(data.message);
          this.matSnackBar.open('An error occured', 'close');
        } else {
          this.matSnackBar.open('Item has been updated', 'close');
          this.dialogRef.close();
          this.tempSub.unsubscribe();
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields.', 'close');
    }
  }
}
