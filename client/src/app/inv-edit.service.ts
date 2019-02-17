import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anyres } from './anyres';

@Injectable({
  providedIn: 'root'
})
export class InvEditService {

  constructor(private http: HttpClient) { }

  getInvItem(id) {
    return this.http.post<Anyres>('/get/inventory/item', { iid: id });
  }

  editInvItem(details) {
    return this.http.post<Anyres>('/update/inventory/item', details);
  }
}
