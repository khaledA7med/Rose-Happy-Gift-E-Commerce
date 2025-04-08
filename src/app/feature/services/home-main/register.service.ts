import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly env: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  register(data: any): Observable<any> {
    return this.http.post(this.env + '/auth/signup', data);
  }

}
