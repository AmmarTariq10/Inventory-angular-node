import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anyres } from './anyres';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getInventoryItems() {
    return this.http.post<Anyres>('/get/inventory', {});
  }

  getSales() {
    return this.http.post<Anyres>('/get/sales', {});
  }

  delInvItem(id) {
    return this.http.post<Anyres>('/delete/inventory', { iid: id });
  }
}
