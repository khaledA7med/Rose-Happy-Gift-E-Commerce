import { Component, OnInit, inject } from '@angular/core';
import { FormInputComponent } from "../../../shared/components/ui/form-input/form-input.component";
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from './../../services/home-main/register.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FormInputComponent,CommonModule, ReactiveFormsModule],
templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false
  _registerService = inject(RegisterService)
  ngOnInit(): void {
    this.initForm();
  }
  matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }
  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,  Validators.minLength(8),
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      gender: new FormControl('', Validators.required)
    },
    { validators: this.matchPasswords } );
  }
  submitForm() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }

    this._registerService.register(this.form.value).subscribe({
      next: (res) => {
      },
      error: (err) => {
      }
    });
  }
  isFieldInvalid(field: string): boolean {
    return this.form.controls[field].invalid && (this.form.controls[field].touched || this.submitted);
  }
}
