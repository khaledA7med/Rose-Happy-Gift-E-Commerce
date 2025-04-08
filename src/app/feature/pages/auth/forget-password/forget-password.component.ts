import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'auth-api';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../../../shared/components/ui/auth-button/auth-button.component';
import {
  ForgetPassword,
  ForgetPasswordForm,
} from '../../../../core/interfaces/auth/forget-password';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule, AuthButtonComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  isSignIn: boolean = true;
  register: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;

  forgetPasswordForm!: FormGroup<ForgetPasswordForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  @Output() changeState = new EventEmitter<string>(); // Event emitter to notify parent

  private _AuthApiService = inject(AuthApiService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.initLoginForm();
  }

  recoverPassword() {
    this.changeState.emit('verify');
  }
  //#region init form
  initLoginForm(): void {
    this.forgetPasswordForm = new FormGroup<ForgetPasswordForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
    });
  }

  get forgetPasswordControls(): ForgetPasswordForm {
    return this.forgetPasswordForm.controls;
  }
  //#endregion

  //#region validation check
  validationChecker(): boolean {
    if (this.forgetPasswordForm.invalid) {
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
  forgetPassword() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: ForgetPassword = {
      email: this.forgetPasswordControls.email.value!,
    };
    let sub = this._AuthApiService.forgetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          // localStorage.setItem('email', data.email);
          this.authService.setUserEmail(data.email);
          this.submitted = false;
          this.loading = false;
          this.recoverPassword();
        }
      },
      error: (err) => {
        this.submitted = false;
        this.loading = false;
      },
    });
    this.subscription.push(sub);
  }
  //#endregion

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
