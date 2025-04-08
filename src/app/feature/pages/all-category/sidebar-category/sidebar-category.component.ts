import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Category } from '../../../../core/interfaces/home-main/category';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../../services/home-main/categories.service';
import { FormsModule } from '@angular/forms';
import {
  LabelType,
  NgxSliderModule,
  Options,
} from '@angular-slider/ngx-slider';
import { FilterProducts } from '../../../../core/interfaces/all-categories/filter-products';

interface Rating {
  stars: number;
  label: string;
}

@Component({
  selector: 'app-sidebar-category',
  imports: [NgIf, FormsModule, NgxSliderModule, CommonModule],
  templateUrl: './sidebar-category.component.html',
  styleUrl: './sidebar-category.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarCategoryComponent implements OnInit {
  categories: Category[] = [];
  keyword: string = '';

  selectedFilters: FilterProducts = {
    category: [],
    rateAvg: [],
    keyword: '',
    'price[gte]': 0,
    'price[lte]': 1000,
  };

  selectedCategories: { category: string[] } = { category: [] };
  selectedRates: { rateAvg: number[] } = { rateAvg: [] };

  priceFrom: number = 0;
  priceTo: number = 1000;

  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    },
  };

  changePrice(e: any) {
    this.priceFrom = e.value;
    this.priceTo = e.highValue;
  }

  subscription: Subscription[] = [];
  open = false;

  @Output() selectedCategoriesChange = new EventEmitter<{
    [key: string]: string;
  }>(); // Emit object
  @Output() selectedFilter = new EventEmitter<FilterProducts>(); // Expect a single object, not an array

  private _categoriesService = inject(CategoriesService);

  brands = [
    { id: 'brand1', name: 'Trooba', count: 8 },
    { id: 'brand2', name: 'Sundrey', count: 8 },
    { id: 'brand3', name: 'Sahoo Gifts', count: 8 },
    { id: 'brand4', name: 'Casterly', count: 8 },
    { id: 'brand5', name: 'Mainden Gifts', count: 8 },
  ];

  sales = [
    { id: 'sale1', name: 'On Sale', count: 8 },
    { id: 'sale2', name: 'In Stock', count: 8 },
    { id: 'sale2', name: 'Out Of Stock', count: 8 },
    { id: 'sale4', name: 'Discount', count: 8 },
  ];

  ratings = [
    { stars: 5 },
    { stars: 4 },
    { stars: 3 },
    { stars: 2 },
    { stars: 1 },
    { stars: 1 },
  ];

  colors = [
    'rgba(96,109,221,1)',
    'rgba(76,175,80,1)',
    'rgba(23,162,184,1)',
    '#FCD34D',
    'rgba(244,67,54,1)',
  ];

  sizes = [
    { id: 'size1', name: 'Extra Small' },
    { id: 'size2', name: 'Small' },
    { id: 'size3', name: 'Medium' },
    { id: 'size4', name: 'Large' },
    { id: 'size5', name: 'Extra Large' },
  ];

  ngOnInit(): void {
    this.getAllCategories();
  }

  toggleSidebar() {
    this.open = !this.open;
    // Toggle body class to prevent scrolling when sidebar is open
  }

  getIdCategory(event: any, categoryId: string) {
    if (event.target.checked) {
      if (!this.selectedCategories.category.includes(categoryId)) {
        this.selectedCategories.category.push(categoryId);
      }
    } else {
      this.selectedCategories.category =
        this.selectedCategories.category.filter((id) => id !== categoryId);
    }
  }

  getIdRates(event: any, rate: number) {
    if (event.target.checked) {
      if (!this.selectedRates.rateAvg.includes(rate)) {
        this.selectedRates.rateAvg.push(rate);
      }
    } else {
      this.selectedRates.rateAvg = this.selectedRates.rateAvg.filter(
        (r) => r !== rate
      );
    }
  }

  applyFilters() {
    this.selectedFilters = {
      category: [...this.selectedCategories.category],
      rateAvg: [...this.selectedRates.rateAvg],
      keyword: this.keyword,
      'price[gte]': this.priceFrom,
      'price[lte]': this.priceTo,
    };

    this.selectedFilter.emit(this.selectedFilters);
  }

  clearFilters() {
    // Reset filter object
    this.selectedFilters = {
      category: [],
      rateAvg: [],
      keyword: '',
      'price[gte]': 0,
      'price[lte]': 1000,
    };

    this.selectedCategories = { category: [] };
    this.selectedRates = { rateAvg: [] };
    this.keyword = '';
    this.priceFrom = 0;
    this.priceTo = 1000;

    // Emit default filters to reset in `AllCategoryComponent`
    this.selectedFilter.emit(this.selectedFilters);

    // Reset all checkboxes
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset keyword input
    const keywordInput = document.getElementById(
      'floating_standard'
    ) as HTMLInputElement;
    if (keywordInput) {
      keywordInput.value = '';
    }

    // Reload all categories/products
    this.getAllCategories();
  }

  getAllCategories() {
    let sub = this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.categories;
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
