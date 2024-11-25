import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductWithQuantity } from '../models/ProductWithQuantity';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];
  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      url: '',
    };
  }

  ngOnInit() {}

  addProductToCart(product: Product, quantity: number) {
    this.cartService.addToCart({ ...product, quantity });

    alert(`Product ${product.name} added to cart.`);
  }
}
