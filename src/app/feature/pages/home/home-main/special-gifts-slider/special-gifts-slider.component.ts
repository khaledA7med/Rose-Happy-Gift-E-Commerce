import { NgStyle } from '@angular/common';
import { ISpecialGifts } from '../../../../../core/interfaces/special-gifts-interface';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-special-gifts-slider',
  imports: [CarouselModule, NgStyle],
  templateUrl: './special-gifts-slider.component.html',
  styleUrl: './special-gifts-slider.component.scss',
})
export class SpecialGiftsSliderComponent {
  @Input() gifts: ISpecialGifts[] = [];
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
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 },
    },
    nav: true,
  };
}
