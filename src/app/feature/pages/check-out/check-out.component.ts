import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { CartSummaryComponent } from '../../../shared/components/ui/cart-summary/cart-summary.component';
import { ICart, IUserCart } from '../../../core/interfaces/checkout/Cart';

@Component({
  selector: 'app-check-out',
  imports: [RouterOutlet, CartSummaryComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent {
  summaryData!: ICart;
  private _checkoutService = inject(CheckoutService);
  ngOnInit() {
    this.getUserCart();
  }

  getUserCart() {
    this._checkoutService.getUserCart().subscribe(
      (res) => {
        this.summaryData = res.cart;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
