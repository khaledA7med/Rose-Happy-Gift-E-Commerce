export interface Adapter {
  loginAdapt(data: any): any;
  registerAdapt(data: any): any;
  resetPassAdapt(data: any): any;
  forgetPassAdapt(data: any): any;
  verifyCodeAdapt(data: any): any;
}
