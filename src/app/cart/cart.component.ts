import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { ProductWithQuantity } from '../models/ProductWithQuantity';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: { item: Product; quantity: number }[] = [];
  totalCost: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.currentCartItems.subscribe((items) => {
      this.cartItems = this.aggregateCartItems(items);
    });

    this.cartService.currentTotalCost.subscribe((cost) => {
      this.totalCost = cost;
    });
  }

  aggregateCartItems(
    items: ProductWithQuantity[]
  ): { item: Product; quantity: number }[] {
    const itemMap: Record<string, { item: Product; quantity: number }> = {};

    items.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].quantity += Number(item.quantity);
      } else {
        itemMap[item.id] = { item: item, quantity: Number(item.quantity) };
      }
    });

    return Object.values(itemMap);
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
    alert(`Product ${item.name} removed from cart.`);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  submitOrder(order: Order): void {
    this.orderService.setOrder({
      ...order,
      orderedItems: this.cartItems,
      totalCost: this.totalCost,
    });

    this.router.navigate(['/confirmation']);
  }
}
