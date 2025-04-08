import { FormControl } from '@angular/forms';

export interface SetPasswordForm {
  email: FormControl<string | null>;
  newPassword: FormControl<string | null>;
}
export interface SetPassword {
  email: string;
  newPassword: string;
}
