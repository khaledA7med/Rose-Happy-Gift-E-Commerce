import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-instgram',
  imports: [NgFor],
  templateUrl: './about-instgram.component.html',
  styleUrl: './about-instgram.component.scss',
})
export class AboutInstgramComponent {
  images = [
    'icons/image 42.svg',
    'icons/image 43.svg',
    'icons/image 44.svg',
    'icons/image 45.svg',
    'icons/image 46.svg',
  ];
}
