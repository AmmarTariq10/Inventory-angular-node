import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anyres } from './anyres';

@Injectable({
  providedIn: 'root'
})
export class InvAddService {

  constructor(private http: HttpClient) { }

  addInvItem(details) {
    return this.http.post<Anyres>('/add/inventory/item', details);
  }
}
