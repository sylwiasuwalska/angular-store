import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent {
  order = new Order();

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.orderSubject.subscribe((items) => {
      this.order = items;
    });
  }
}
