import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anyres } from './anyres';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getReceiptForSale(sales) {
    return this.http.post<Anyres>('/get/sales/receipt', sales);
  }
}
