import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../services/home-main/categories.service';
import { Products } from '../../../core/interfaces/home-main/Products';
import { PopularCardComponent } from '../../../shared/components/ui/popular-card/popular-card.component';
import { SidebarCategoryComponent } from './sidebar-category/sidebar-category.component';
import { RouterLink } from '@angular/router';
import { FilterProducts } from '../../../core/interfaces/all-categories/filter-products';

@Component({
  selector: 'app-all-category',
  imports: [PopularCardComponent, SidebarCategoryComponent],
  templateUrl: './all-category.component.html',
  styleUrl: './all-category.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AllCategoryComponent {
  private categories = inject(CategoriesService);

  selectedFilters: FilterProducts = {
    category: [],
    rateAvg: [],
    keyword: '',
    'price[gte]': 0,
    'price[lte]': 1000,
  };
  allProducts: Products[] = [];
  subscription: Subscription[] = [];
  paginatedProducts: Products[] = [];
  page = 1; // Current page
  pageSize = 6; // Number of items per page
  maxVisiblePages = 4; // Max visible pages before ellipsis

  ngOnInit(): void {
    this.getCategoryProducts();
  }

  handleAddToCart(product: any): void {
    console.log('Card clicked!');
  }

  // Update selected filters and fetch products
  updateSelectedFilters(filters: FilterProducts) {
    this.selectedFilters = { ...filters };
    if (
      filters.category.length === 0 &&
      filters.rateAvg.length === 0 &&
      filters.keyword === '' &&
      filters['price[gte]'] === 0 &&
      filters['price[lte]'] === 1000
    ) {
      this.getCategoryProducts();
    } else {
      this.filterProducts();
    }
  }

  getCategoryProducts() {
    this.categories.getCategoryProducts({}).subscribe({
      next: (data: any) => {
        this.allProducts = data.products;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  filterProducts() {
    const params: Partial<FilterProducts> = {};

    if (this.selectedFilters.category.length) {
      params.category = [...this.selectedFilters.category];
    }
    if (this.selectedFilters.rateAvg.length) {
      params.rateAvg = [...this.selectedFilters.rateAvg];
    }
    if (this.selectedFilters.keyword) {
      params.keyword = this.selectedFilters.keyword;
    }
    if (this.selectedFilters['price[gte]'] !== 0) {
      params['price[gte]'] = this.selectedFilters['price[gte]'];
    }
    if (this.selectedFilters['price[lte]'] !== 1000) {
      params['price[lte]'] = this.selectedFilters['price[lte]'];
    }

    this.categories.filterProducts(params).subscribe({
      next: (data: any) => {
        this.allProducts = data.products;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.forEach((s) => s.unsubscribe());
  }
}
