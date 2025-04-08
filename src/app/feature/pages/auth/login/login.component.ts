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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../../../shared/components/ui/auth-button/auth-button.component';
import { Login, LoginForm } from '../../../../core/interfaces/auth/login';
import { ModalService } from '../../../../shared/services/modal.service';
import { localStorageKeys } from '../../../../core/interfaces/localStorageKeys';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, AuthButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  isSignIn: boolean = true;
  register: boolean = false;
  forgetPass: boolean = false;
  verify: boolean = false;
  setPass: boolean = false;

  loginForm!: FormGroup<LoginForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];

  @Output() changeState = new EventEmitter<string>(); // Event emitter to notify parent

  private _AuthApiService = inject(AuthApiService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.initLoginForm();
  }

  forgetPassword() {
    this.changeState.emit('forgetPassword');
  }
  registerAccount() {
    this.changeState.emit('register');
  }

  //#region  user info
  getLoggedUser() {
    let sub = this._AuthApiService.userInfo().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //#region init form
  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  get loginControls(): LoginForm {
    return this.loginForm.controls;
  }
  //#endregion

  //#region validation check
  validationChecker(): boolean {
    if (this.loginForm.invalid) {
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
  signin() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Login = {
      email: this.loginControls.email.value!,
      password: this.loginControls.password.value!,
    };
    let sub = this._AuthApiService.login(data).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          localStorage.setItem(localStorageKeys.JWT, res.token);
          this.submitted = false;
          this.loading = false;
          this.onModalClose();
          window.location.reload();
          this.getLoggedUser();
        }
      },
      error: (err) => {
        this.loading = false;
        this.submitted = false;
        this.onModalClose();
      },
    });
    this.subscription.push(sub);
  }
  //#endregion

  onModalClose() {
    this.modalService.close('login');
    this.isSignIn = true;
    this.forgetPass = false;
    this.verify = false;
    this.setPass = false;
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
