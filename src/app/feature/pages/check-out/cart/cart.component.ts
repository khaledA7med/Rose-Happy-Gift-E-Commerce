import { Component, inject, OnInit } from '@angular/core';
import {
  ICart,
  ICartProducts,
} from '../../../../core/interfaces/checkout/Cart';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData!: ICart;
  cartItems: ICartProducts[] = [];
  tableHeaders = [
    'Image',
    'Product Name',
    'Price',
    'Quantity',
    'Subtotal',
    'Actions',
  ];

  private _checkoutService = inject(CheckoutService);

  ngOnInit(): void {
    this.getUserCart();
  }

  /** Fetch user's cart items and calculate subtotals & total **/
  getUserCart() {
    this._checkoutService.getUserCart().subscribe(
      (res) => {
        this.cartData = res.cart;

        // Calculate `subTotal` for each item during initialization
        this.cartItems = res.cart.cartItems.map((product) => ({
          ...product,
          subTotal: product.product.price * product.quantity,
        }));
      },
      (err) => console.log(err)
    );
  }

  /** Handle increasing or decreasing quantity **/
  updateQuantity(product: ICartProducts, change: number): void {
    const newQuantity = product.quantity + change;
    if (newQuantity < 1) return; // Prevent invalid values

    product.quantity = newQuantity;
    product.subTotal = product.product.price * product.quantity; // Recalculate subTotal
    this.updateCartQuantity(product);
  }

  /** Handle manual input change **/
  onQuantityChange(product: ICartProducts): void {
    if (product.quantity < 1 || isNaN(product.quantity)) {
      product.quantity = 1; // Prevent invalid input
    }

    product.subTotal = product.product.price * product.quantity; // Update subTotal
    this.updateCartQuantity(product);
  }

  /** Call API to update quantity **/
  updateCartQuantity(product: ICartProducts): void {
    if (!product?.product?.id) return;

    const data = { quantity: product.quantity };
    this._checkoutService
      .updateCartProductQuantity(product.product.id, data)
      .subscribe({
        next: () => console.log(`Updated quantity to ${product.quantity}`),
      });
  }

  /** Remove product from cart **/
  RemoveProductFromCart(productId?: string): void {
    this._checkoutService.deleteProductFromCart(productId).subscribe({
      next: () => {
        console.log('Product removed from cart');
        this.getUserCart(); // Refresh cart after removal
      },
    });
  }
}
