import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  Register,
  RegisterForm,
} from '../../../../core/interfaces/auth/register';
import { AuthApiService } from 'auth-api';
import { ModalService } from '../../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../../../shared/components/ui/auth-button/auth-button.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, AuthButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  register: boolean = true;
  isSignIn: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;

  registerForm!: FormGroup<RegisterForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  @Output() changeState = new EventEmitter<string>(); // Event emitter to notify parent

  private _AuthApiService = inject(AuthApiService);
  private modalService = inject(ModalService);

  login() {
    this.changeState.emit('login');
  }
  ngOnInit(): void {
    this.initRegisterForm();
  }

  //#region init form
  initRegisterForm(): void {
    this.registerForm = new FormGroup<RegisterForm>(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(010|011|012|015)\d{8}$/),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
        rePassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ]),
      },
      { validators: this.matchPasswords('password', 'rePassword') }
    );
  }

  get registerControls(): RegisterForm {
    return this.registerForm.controls;
  }
  //#endregion

  //#region Validtion checkers
  matchPasswords(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (
        matchingControl?.errors &&
        !matchingControl.errors['passwordMismatch']
      ) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // check if the passwords match
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  validationChecker(): boolean {
    if (this.registerForm.invalid) {
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
  signup() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Register = {
      username: this.registerControls.username.value!,
      firstName: this.registerControls.firstName.value!,
      lastName: this.registerControls.lastName.value!,
      phone: this.registerControls.phone.value!,
      email: this.registerControls.email.value!,
      password: this.registerControls.password.value!,
      rePassword: this.registerControls.rePassword.value!,
    };
    let sub = this._AuthApiService.register(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.submitted = false;
          this.loading = false;
          this.login();
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
