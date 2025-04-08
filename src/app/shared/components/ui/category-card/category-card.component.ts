import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() icon!: string; // URL for the category icon
  @Input() title!: string; // Title of the category
  @Input() items: number = 0; // Number of items in the category
  @Output() cardClick = new EventEmitter<void>();

  onCardClick(): void {
    this.cardClick.emit();
  }
}
