import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Modal } from 'flowbite';
import { PopularCardComponent } from '../../../../shared/components/ui/popular-card/popular-card.component';
import { Products } from '../../../../core/interfaces/home-main/Products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related-products',
  imports: [PopularCardComponent, CommonModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
})
export class RelatedProductsComponent implements AfterViewInit {
  @Input() relatedProducts: Products[] = []; // Ensure it's an array of `Products`

  @ViewChild('relatedProductsModal') modalElement!: ElementRef;
  modal!: Modal;

  constructor() {}

  ngOnInit(): void {
    console.log('Related Products:', this.relatedProducts);
  }

  handleAddToCart(product: Products) {
    console.log('Adding to cart:', product);
  }

  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modal = new Modal(this.modalElement.nativeElement);
    } else {
      console.error('Modal Element Not Found');
    }
  }

  togglePopup(): void {
    console.log('Toggling Popup');
    if (this.modal) {
      // Check if the modal is currently visible
      if (this.modalElement.nativeElement.classList.contains('hidden')) {
        this.modal.show();
      } else {
        this.modal.hide();
      }
    }
  }
}
