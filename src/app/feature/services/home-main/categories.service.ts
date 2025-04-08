import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../../../core/interfaces/home-main/category';
import { ApiRoutes } from '../../../core/interfaces/apiRoutes';
import { ProductsResponse } from '../../../core/interfaces/home-main/Products';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      this.env + ApiRoutes.home.categories
    );
  }

  getCategoryProducts(params?: {
    [key: string]: string | number | boolean;
  }): Observable<ProductsResponse> {
    let httpParams = new HttpParams();

    // Append each key-value pair dynamically to the HttpParams object
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key].toString());
      });
    }
    return this.http.get<ProductsResponse>(this.env + ApiRoutes.home.products, {
      params: httpParams ? httpParams : undefined,
    });
  }

  filterProducts(params?: {
    [key: string]: string | number | boolean | string[] | number[];
  }): Observable<ProductsResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];

        if (Array.isArray(value)) {
          // Append each array item separately
          value.forEach((item) => {
            httpParams = httpParams.append(key, item.toString());
          });
        } else {
          // Append single values normally
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<ProductsResponse>(this.env + ApiRoutes.home.products, {
      params: httpParams,
    });
  }
}
