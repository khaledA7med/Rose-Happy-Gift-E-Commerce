import { Products } from '../home-main/Products';

export interface IUserCart {
  message: string;
  numOfCartItems: number;
  cart: ICart;
}

export interface ICart {
  _id: string;
  user: string;
  cartItems: ICartProducts[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartProducts {
  product: Products;
  price: number;
  quantity: number;
  _id: string;
  subTotal?: number; // Add subTotal property
}
