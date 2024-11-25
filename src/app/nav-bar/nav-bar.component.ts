import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  numberOfItemsInCart!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentCartItems.subscribe((items) => {
      this.numberOfItemsInCart = items.length;
    });
  }
}
