import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdapter implements Adapter {
  constructor() {}

  loginAdapt(data: any) {
    return {
      message: data.message,
      token: data.token,
    };
  }
  registerAdapt(data: any) {
    return {
      message: data.message,
    };
  }
  forgetPassAdapt(data: any) {
    return {
      message: data.message,
      info: data.info,
    };
  }
  verifyCodeAdapt(data: any) {
    return {
      status: data.status,
    };
  }
  resetPassAdapt(data: any) {
    return {
      message: data.message,
    };
  }
}
