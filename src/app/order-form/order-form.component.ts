import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';
  agreement: boolean = false;
  @Output() submitOrder: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  onAgreementChange(event: boolean) {
    this.agreement = event;
    console.log('Agreement changed:', this.agreement);
  }
  submitForm(): void {
    if (this.agreement) {
      const order = {
        fullName: this.fullName,
        address: this.address,
        cardNumber: this.cardNumber,
      };
      this.submitOrder.emit(order);
      this.fullName = '';
      this.address = '';
      this.cardNumber = '';
    }
  }
}
