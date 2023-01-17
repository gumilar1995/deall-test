import { Product } from "./Products";
import { ListResponse } from "./Wrapper";

export interface CartList extends ListResponse {
  carts: Cart[];
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
