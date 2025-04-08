export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}
export interface metadata {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface CategoryResponse {
  categories: Category[];
  metadata: metadata;
  message: string;
}
