import { Component } from '@angular/core';
import { LoginComponent } from '../../../feature/pages/auth/login/login.component';
import { ForgetPasswordComponent } from '../../../feature/pages/auth/forget-password/forget-password.component';
import { VerifyComponent } from '../../../feature/pages/auth/verify/verify.component';
import { SetPasswordComponent } from '../../../feature/pages/auth/set-password/set-password.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    LoginComponent,
    ForgetPasswordComponent,
    VerifyComponent,
    SetPasswordComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  isSignIn: boolean = true;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;
  title: string = 'Login to your account';

  // Method to toggle the login state
  toggleState(state: string) {
    // Reset all states
    this.isSignIn = false;
    this.forgetPass = false;
    this.verify = false;
    this.setPass = false;

    // Update the state based on the input
    switch (state) {
      case 'login':
        this.isSignIn = true;
        this.title = 'Login to your account';
        break;
      case 'forgetPassword':
        this.forgetPass = true;
        this.title = 'Forgot Your Password ?';
        break;
      case 'verify':
        this.verify = true;
        this.title = 'Verify Code';
        break;
      case 'setPassword':
        this.setPass = true;
        this.title = 'Set a Password';
        break;
      default:
        break;
    }
  }

  resetState() {
    this.title = 'Login to your account';
    this.isSignIn = true;
    this.forgetPass = false;
    this.verify = false;
    this.setPass = false;
  }
}
