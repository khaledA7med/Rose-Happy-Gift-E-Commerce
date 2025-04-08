import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PopularCardComponent } from '../../../../../shared/components/ui/popular-card/popular-card.component';
import { BestSellerService } from '../../../../services/home-main/best-seller.service';
import { BestSellerItem } from '../../../../../core/interfaces/home-main/BestSeller';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-best-seller',
  imports: [CarouselModule, PopularCardComponent],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BestSellerComponent implements OnInit, OnDestroy {
  private categories = inject(BestSellerService);

  allBestSeller: BestSellerItem[] = [];
  subscription: Subscription[] = [];
  badge: string = '';

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    nav: false,
    navSpeed: 1200,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
  };

  ngOnInit(): void {
    this.getBestSellerItems();
  }

  getBestSellerItems() {
    let sub = this.categories.getBestSellerItems().subscribe({
      next: (data) => {
        this.allBestSeller = data.bestSeller;
        this.allBestSeller.map((el) => {
          if (el.quantity > 0) {
            this.badge = 'OUT OF STOCK';
          } else if (el.quantity == 0) {
            this.badge = 'HOT';
          } else {
            this.badge = 'NEW';
          }
        });
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
