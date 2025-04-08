import { ProductRes } from './../../interfaces/product-res';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../../interfaces/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductDetials(productId: string): Observable<ProductRes> {
    return this.http.get<ProductRes>(
      this.env + ApiRoutes.product.singleProduct(productId)
    );
  }
  getRelatedProducts(categoryId: string): Observable<ProductRes> {
    return this.http.get<ProductRes>(
      this.env + ApiRoutes.product.relatedProducts(categoryId)
    );
  }
  updateProductQuantity(
    productId: string,
    data: { quantity: number }
  ): Observable<ProductRes> {
    return this.http.put<ProductRes>(
      this.env + ApiRoutes.product.singleProduct(productId),
      data
    );
  }
}
