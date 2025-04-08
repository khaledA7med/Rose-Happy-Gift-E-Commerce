import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SpecialGiftsServiceService } from '../../../../../core/services/special-gifts-service/special-gifts-service.service';
import { ISpecialGifts } from '../../../../../core/interfaces/special-gifts-interface';
import { NgClass, NgStyle } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpecialGiftsSliderComponent } from '../special-gifts-slider/special-gifts-slider.component';

@Component({
  selector: 'specialGifts',
  imports: [SpecialGiftsSliderComponent, NgStyle, NgClass],
  templateUrl: './special-gifts.component.html',
  styleUrl: './special-gifts.component.scss',
})
export class SpecialGiftsComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  // Use the `inject` function to inject the service
  private _specialGiftsServiceService = inject(SpecialGiftsServiceService);

  gifts: ISpecialGifts[] = [];

  ngOnInit(): void {
    this.displaySpecialGifts();
  }

  displaySpecialGifts() {
    this._specialGiftsServiceService
      .getGifts()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: ISpecialGifts[]) => {
          this.gifts = res;
        },
        error: (err) => {
          console.error('Error fetching gifts:', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
