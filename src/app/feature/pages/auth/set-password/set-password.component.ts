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
  SetPassword,
  SetPasswordForm,
} from '../../../../core/interfaces/auth/set-password';

@Component({
  selector: 'app-set-password',
  imports: [ReactiveFormsModule, CommonModule, AuthButtonComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  isSignIn: boolean = true;
  register: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;

  setPasswordForm!: FormGroup<SetPasswordForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  @Output() changeState = new EventEmitter<string>(); // Event emitter to notify parent

  private _AuthApiService = inject(AuthApiService);

  ngOnInit(): void {
    this.initSetPasswordForm();
  }

  setPassword() {
    this.changeState.emit('login');
  }

  initSetPasswordForm(): void {
    this.setPasswordForm = new FormGroup<SetPasswordForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  get setPasswordControls(): SetPasswordForm {
    return this.setPasswordForm.controls;
  }

  validationChecker(): boolean {
    if (this.setPasswordForm.invalid) {
      return false;
    }
    return true;
  }

  resetPassword() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: SetPassword = {
      email: this.setPasswordControls.email.value!,
      newPassword: this.setPasswordControls.newPassword.value!,
    };
    this._AuthApiService.resetPassword(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.submitted = false;
          this.loading = false;
          this.setPassword();
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
