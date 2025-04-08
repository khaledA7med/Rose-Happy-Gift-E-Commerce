import {
  ChangeDetectorRef,
  Component,
  effect,
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
import { Verify, VerifyForm } from '../../../../core/interfaces/auth/verify';
import { AuthService } from '../../../services/auth/auth.service';
import { ForgetPassword } from '../../../../core/interfaces/auth/forget-password';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule, CommonModule, AuthButtonComponent],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit, OnDestroy {
  isSignIn: boolean = true;
  register: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;

  verifyForm!: FormGroup<VerifyForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];
  userEmail: string | null = null;

  resendDisabled: boolean = false;
  timeRemaining: number = 30;
  timerInterval: any;

  @Output() changeState = new EventEmitter<string>(); // Event emitter to notify parent

  private _AuthApiService = inject(AuthApiService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      this.userEmail = this.authService.getUserEmailSignal()();
      // You can now use this.userEmail as needed in your component
    });
  }

  ngOnInit(): void {
    this.initVerifyForm();
    this.startResendTimer();
  }
  verifyCode() {
    this.changeState.emit('setPassword');
  }

  initVerifyForm(): void {
    this.verifyForm = new FormGroup<VerifyForm>({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]{6}$/),
      ]),
    });
  }

  get verifyControls(): VerifyForm {
    return this.verifyForm.controls;
  }

  startResendTimer(): void {
    this.resendDisabled = true;
    this.timeRemaining = 60;
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.cdr.detectChanges();
      } else {
        this.resendDisabled = false;
        clearInterval(this.timerInterval);
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  // Resend code function
  resendCode(): void {
    this.resendOtp();
  }

  resendOtp() {
    this.startResendTimer();
    let data: ForgetPassword = {
      email: this.userEmail!,
    };
    let sub = this._AuthApiService.forgetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          console.log('success');
        }
      },
      error: (err) => {
        console.log('error');
      },
    });
    this.subscription.push(sub);
  }

  validationChecker(): boolean {
    if (this.verifyForm.invalid) {
      return false;
    }
    return true;
  }
  verifyOtp() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Verify = {
      resetCode: this.verifyControls.resetCode.value!.toString(),
    };
    let sub = this._AuthApiService.verifyCode(data).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.submitted = false;
          this.loading = false;
          this.verifyCode();
        }
      },
      error: (err) => {
        this.submitted = false;
        this.loading = false;
      },
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
