import { Category } from './home-main/category';
export const ApiRoutes = {
  home: {
    categories: 'categories',
    bestSeller: 'best-seller',
    products: 'products',
  },
  product: {
    products: 'products',
    singleProduct: (id: string) => `/products/${id}`,
    relatedProducts: (categoryid: string) => `/products?category=${categoryid}`,
  },
  checkout: {
    cart: 'cart',
    cartProductt: (id?: string) => `cart/${id}`,
  },
};
