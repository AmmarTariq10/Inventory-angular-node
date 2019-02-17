import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { InvAddService } from '../inv-add.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inv-add',
  templateUrl: './inv-add.component.html',
  styleUrls: ['./inv-add.component.css']
})
export class InvAddComponent implements OnInit {

  addInv: FormGroup;
  tempSub: Subscription;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private matSnackBar: MatSnackBar, private dialogRef: MatDialogRef<InvAddComponent>, private invAdd: InvAddService) { }

  ngOnInit() {
    this.addInv = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      quantity: ['', [
        Validators.required
      ]],
      price: ['', [
        Validators.required
      ]]
    });

  }

  addInvItem() {
    if (this.addInv.valid) {
      const val = this.addInv.value;
      this.tempSub = this.invAdd.addInvItem(val).subscribe(data => {
        if (data.error) {
          this.matSnackBar.open('An error occured', 'close');
        } else {
          this.matSnackBar.open('Item added to inventory', 'close');
          this.tempSub.unsubscribe();
          this.closeDialogRef();
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields', 'close');
    }
  }

  closeDialogRef() {
    this.dialogRef.close();
  }
}
