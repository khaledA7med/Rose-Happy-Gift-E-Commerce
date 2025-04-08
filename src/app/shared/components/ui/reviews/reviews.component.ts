import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ReviewCardComponent } from './review-card/review-card.component';
import * as reviewData from '../../../../../assets/data/reviews.json';

@Component({
  selector: 'app-reviews',
  imports: [CarouselModule, ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  reviews: any[] = (reviewData as any).default;

  @Input() sliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
}
