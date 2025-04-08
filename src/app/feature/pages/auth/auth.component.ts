import { Component, inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyComponent } from './verify/verify.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';
import { ModalService } from '../../../shared/services/modal.service';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  imports: [
    ModalComponent,
    LoginComponent,
    ForgetPasswordComponent,
    VerifyComponent,
    SetPasswordComponent,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private modalService = inject(ModalService);

  isSignIn: boolean = true;
  register: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;
  title: string = 'Login to your account';

  // Method to toggle the login state
  toggleState(state: string) {
    // Reset all states
    this.isSignIn = false;
    this.register = false;
    this.forgetPass = false;
    this.verify = false;
    this.setPass = false;

    // Update the state based on the input
    switch (state) {
      case 'login':
        this.isSignIn = true;
        this.title = 'Login to your account';
        break;
      case 'register':
        this.register = true;
        this.title = 'Create Account';
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
    this.register = false;
    this.forgetPass = false;
    this.verify = false;
    this.setPass = false;
  }

  // Listen for modal close event and reset states
  onModalClose() {
    this.modalService.close('login');
    this.resetState();
  }
}
