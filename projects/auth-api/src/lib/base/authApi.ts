import { Observable } from 'rxjs';

export abstract class AuthApi {
  abstract login(data: any): Observable<any>;
  abstract register(data: any): Observable<any>;
  abstract logout(): Observable<any>;
  abstract changePassword(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
  abstract forgetPassword(data: any): Observable<any>;
  abstract editProfile(data: any): Observable<any>;
  abstract userInfo(): Observable<any>;
  abstract deleteUser(): Observable<any>;
  abstract verifyCode(data: any): Observable<any>;
}
