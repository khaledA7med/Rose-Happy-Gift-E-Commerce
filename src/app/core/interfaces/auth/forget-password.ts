import { FormControl } from '@angular/forms';

export interface ForgetPasswordForm {
  email: FormControl<string | null>;
}
export interface ForgetPassword {
  email: string;
}
