import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anyres } from './anyres';

@Injectable({
  providedIn: 'root'
})
export class NewSaleService {

  constructor(private http: HttpClient) { }

  generateReceipt(details) {
    return this.http.post<Anyres>('/add/sales', details);
  }
}
