
export interface Product {
  productId: string;
  quantity: number;
}

export interface PostCartFormProps {
  initialCartData?: Cart;
  editMode?: boolean;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Product[];
}

export interface CartDetailsProps {
  data: Cart | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}
