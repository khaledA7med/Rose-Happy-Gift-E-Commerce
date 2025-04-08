import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BestSellerResponse } from '../../../core/interfaces/home-main/BestSeller';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../../../core/interfaces/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class BestSellerService {
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBestSellerItems(): Observable<BestSellerResponse> {
    return this.http.get<BestSellerResponse>(
      this.env + ApiRoutes.home.bestSeller
    );
  }
}
