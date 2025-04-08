import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../../../../../shared/components/ui/category-card/category-card.component';
import { CategoriesService } from '../../../../services/home-main/categories.service';
import { Category } from '../../../../../core/interfaces/home-main/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent, CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private categories = inject(CategoriesService);

  allCategories: Category[] = [];
  subscription: Subscription[] = [];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    navSpeed: 1200,
    margin: 5,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  onCardSelected(): void {
    console.log('Card clicked!');
  }

  getAllCategories() {
    let sub = this.categories.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data.categories;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
