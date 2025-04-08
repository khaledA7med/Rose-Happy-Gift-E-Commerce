import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-button',
  imports: [],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent {
  @Input() label: string = 'Login'; // Default button text
  @Input() disabled: boolean = false; // Disable button
  @Input() loading: boolean = false; // Track loading state

  @Output() clicked = new EventEmitter<void>(); // Event to emit click action

  onClick(): void {
    if (!this.loading && !this.disabled) {
      this.clicked.emit(); // Emit event when button is clicked
    }
  }
}
