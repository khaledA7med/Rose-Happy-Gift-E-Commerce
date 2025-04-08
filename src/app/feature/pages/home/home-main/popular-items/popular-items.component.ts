import { Component, inject, OnInit } from '@angular/core';
import { PopularCardComponent } from '../../../../../shared/components/ui/popular-card/popular-card.component';
import { Category } from '../../../../../core/interfaces/home-main/category';
import { CategoriesService } from '../../../../services/home-main/categories.service';
import { BestSellerItem } from '../../../../../core/interfaces/home-main/BestSeller';
import { Products } from '../../../../../core/interfaces/home-main/Products';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-items',
  imports: [PopularCardComponent, CommonModule],
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.scss',
})
export class PopularItemsComponent implements OnInit {
  private categories = inject(CategoriesService);
  subscribes: Subscription[] = [];

  activeCategory: string | null = null;
  allCategories: Category[] = [];
  allBestItems: BestSellerItem[] = [];
  allProducts: Products[] = [];
  //#region Component Functionality
  ngOnInit(): void {
    this.getAllCategories();
    this.getCategoryProducts();
  }
  ngOnDestroy(): void {
    this.subscribes && this.subscribes.forEach((s) => s.unsubscribe());
  }
  //#endregion

  //#region Get Products
  getAllCategories() {
    this.categories.getAllCategories().subscribe({
      next: (data: any) => {
        this.allCategories = data.categories;

        if (this.allCategories.length > 0) {
          this.activeCategory = this.allCategories[0]._id;
          this.getCategoryProducts(this.activeCategory);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getCategoryProducts(id?: string) {
    const params: { [key: string]: string | number | boolean } = id
      ? { category: id }
      : {};
    this.categories.getCategoryProducts(params).subscribe({
      next: (data: any) => {
        this.allProducts = data.products;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  //#endregion

  //#region get Active Category
  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.getCategoryProducts(categoryId);
  }
  //#endregion
  handleAddToCart(item: any) {
    console.log(item);
  }
}
