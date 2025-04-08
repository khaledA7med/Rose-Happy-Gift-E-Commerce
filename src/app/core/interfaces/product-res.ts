import { Category } from './home-main/category';
export interface ProductRes {
    message: string
    product: Product
  }
  
  export interface Product {
    category: any
    filter(arg0: (p: any) => boolean): Product[]
    _id: string
    title: string
    slug: string
    description: string
    imgCover: string
    images: string[]
    price: number
    priceAfterDiscount: number
    // category:number
    __v: number
    discount: number
    sold: number
    rateAvg: number
    rateCount: number
    id: string
  }
  