import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Products } from '../../../../core/interfaces/home-main/Products';
import { Product } from '../../../../core/interfaces/product-res';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../../feature/services/checkout/checkout.service';
import { AddCart } from '../../../../core/interfaces/checkout/addCart';
import { localStorageKeys } from '../../../../core/interfaces/localStorageKeys';

@Component({
  selector: 'popular-card',
  imports: [CurrencyPipe],
  templateUrl: './popular-card.component.html',
  styleUrl: './popular-card.component.scss',
})
export class PopularCardComponent {
  @Input() cardData!: Products;
  @Input() badge: string = '';
  @Input() imgCover: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() rateAvg: number = 0;

  private router = inject(Router);
  private checkoutService = inject(CheckoutService);

  // @Output() addToCart = new EventEmitter<void>();

  addToCart(product: string, quantity: number) {
    const token = localStorage.getItem(localStorageKeys.JWT);
    let cartProduct: AddCart = {
      product: product,
      quantity: quantity,
    };
    if (token) {
      this.checkoutService.addToCart(cartProduct).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      alert('Please login to add to cart');
    }
  }

  // View Product button click (Prevents propagation)
  viewProduct(id: string) {
    this.router.navigate(['/product-details', id]);
  }

  // Add to Wishlist button click (Prevents propagation)
  addToWishlist(event: any) {
    console.log(event);
  }
}
