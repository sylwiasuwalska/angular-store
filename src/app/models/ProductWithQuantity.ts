import { Product } from './Product';

export class ProductWithQuantity extends Product {
  quantity: number;

  constructor() {
    super();
    this.quantity = 0;
  }
}
