import { ListResponse } from "./Wrapper";

export interface Products extends ListResponse {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsParams {
  skip: number;
  limit: number;
}
