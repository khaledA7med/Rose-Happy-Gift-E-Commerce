import { FormControl } from '@angular/forms';

export interface VerifyForm {
  resetCode: FormControl<string | null>;
}
export interface Verify {
  resetCode: string;
}
