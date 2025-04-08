import { Component, Input } from '@angular/core';
import { ICart } from '../../../../core/interfaces/checkout/Cart';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [DecimalPipe],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  @Input() cartData!: ICart;
}
