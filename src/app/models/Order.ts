import { Product } from './Product';

export class Order {
  fullName: string;
  address: string;
  cardNumber: string;
  orderedItems: { item: Product; quantity: number }[];
  totalCost: number;
  constructor() {
    this.fullName = '';
    this.address = '';
    this.cardNumber = '';
    this.orderedItems = [];
    this.totalCost = 0;
  }
}
