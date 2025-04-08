import { FormControl } from '@angular/forms';

export interface RegisterForm {
  username: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  rePassword: FormControl<string | null>;
}
export interface Register {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  rePassword: string;
}
