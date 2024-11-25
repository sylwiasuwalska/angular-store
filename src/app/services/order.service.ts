import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order;
  orderSubject;

  constructor() {
    this.order = {
      fullName: '',
      address: '',
      cardNumber: '',
      orderedItems: [],
      totalCost: 0,
    };

    this.orderSubject = new BehaviorSubject<Order>(this.order);
  }

  setOrder(data: Order) {
    this.orderSubject.next(data);
  }

  getOrder() {
    return this.orderSubject.asObservable();
  }
}
