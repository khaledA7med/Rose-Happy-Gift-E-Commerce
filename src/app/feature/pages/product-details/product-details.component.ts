import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductRes } from '../../../core/interfaces/product-res';
import { ProductService } from '../../../core/services/product-service/product.service';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { Products } from '../../../core/interfaces/home-main/Products';
import { AddCart } from '../../../core/interfaces/checkout/addCart';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { localStorageKeys } from '../../../core/interfaces/localStorageKeys';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RelatedProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  relatedProducts: Products[] = []; // Change from single product to array
  private checkoutService = inject(CheckoutService);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  mainImage: string = '';
  quantity: number = 1;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productDetails(productId);
      }
    });
  }

  productDetails(id: string): void {
    this.productService
      .getProductDetials(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ProductRes) => {
        if (response && response.product) {
          this.product = response.product;
          this.mainImage = response.product.imgCover;

          // Load related products after setting the product
          if (this.product.category) {
            this.loadRelatedProducts(this.product.category);
          }
        }
      });
  }

  loadRelatedProducts(categoryId: string): void {
    this.productService
      .getRelatedProducts(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.relatedProducts = response?.products || [];
      });
  }

  changeImage(selectedImage: string): void {
    this.mainImage = selectedImage;
  }

  increaseQuantity(): void {
    this.quantity++;
    let data = {
      quantity: this.quantity,
    };
    this.productService.updateProductQuantity(this.product.id, data).subscribe({
      next: (res) => {
        console.log(res);
        alert('Quantity updated successfully');
      },
    });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
    let data = {
      quantity: this.quantity,
    };
    this.productService.updateProductQuantity(this.product.id, data).subscribe({
      next: (res) => {
        console.log(res);
        alert('Quantity updated successfully');
      },
    });
  }

  addToCart(product: string) {
    const token = localStorage.getItem(localStorageKeys.JWT);
    let cartProduct: AddCart = {
      product: product,
      quantity: this.quantity,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
