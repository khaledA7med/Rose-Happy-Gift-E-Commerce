// home.route.ts
import { Routes } from '@angular/router';
import { CheckOutComponent } from './check-out.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
    data: { summaryData: {} }, // Initial placeholder
    children: [
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.component').then((c) => c.CartComponent),
      },
    ],
  },
];
