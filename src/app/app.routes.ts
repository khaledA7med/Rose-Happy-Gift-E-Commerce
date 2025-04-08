import { CartComponent } from './feature/pages/check-out/cart/cart.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/pages/auth-layout/auth-layout.component';
import { ProductDetailsComponent } from './feature/pages/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/home/home-main/home.route').then(
            (c) => c.routes
          ),
      },
      { path: 'product-details/:id', component: ProductDetailsComponent },

      {
        path: 'home',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/home/home-main/home.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'all-categories',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/all-category/AllCategory.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'about',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/about/About.route').then((c) => c.routes),
      },
      {
        path: '',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/check-out/checkout.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'delivery',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/static/delivery/delivery.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'faqs',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/static/faqs/faqs.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'policy',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/static/policy/policy.route').then(
            (c) => c.routes
          ),
      },
      {
        path: 'stores',
        canActivate: [],
        loadChildren: () =>
          import('./feature/pages/static/stores/stores.route').then(
            (c) => c.routes
          ),
      },
    ],
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./core/pages/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
  },
];
