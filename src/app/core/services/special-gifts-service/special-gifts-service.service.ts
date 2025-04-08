import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialGifts } from '../../interfaces/special-gifts-interface';

@Injectable({
  providedIn: 'root',
})
export class SpecialGiftsServiceService {
  private _httpClient = inject(HttpClient); // Use inject() to get HttpClient
  private jsonUrl = 'special-gifts.json';

  getGifts(): Observable<ISpecialGifts[]> {
    return this._httpClient.get<ISpecialGifts[]>(this.jsonUrl); // Use _httpClient
  }
}
