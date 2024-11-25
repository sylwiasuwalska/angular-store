import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { ProductWithQuantity } from '../models/ProductWithQuantity';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ProductWithQuantity[] = [];

  private cartItemsSubject = new BehaviorSubject<ProductWithQuantity[]>(
    this.cartItems
  );
  private totalCostSubject = new BehaviorSubject<number>(0);

  currentCartItems = this.cartItemsSubject.asObservable();
  currentTotalCost = this.totalCostSubject.asObservable();

  constructor() {}

  addToCart(item: ProductWithQuantity) {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
    this.updateTotalCost();
  }

  removeFromCart(item: Product) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    this.cartItemsSubject.next(this.cartItems);
    this.updateTotalCost();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.updateTotalCost();
  }

  private updateTotalCost() {
    const totalCost = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.totalCostSubject.next(totalCost);
  }

  private aggregateCartItems(
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
}
