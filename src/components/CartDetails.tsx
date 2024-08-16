import { CartDetailsProps } from "../types";
const CartDetails = ({ data, isLoading, isError, error }: CartDetailsProps) => {
  return (
    <div>
      <h1>Cart Details</h1>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {(error as Error).message}</div>}

      {data && (
        <ul>
          <li>ID: {data.id}</li>
          <li>User ID: {data.userId}</li>
          <li>Date: {data.date}</li>
          <li>
            Products:
            <ul>
              {data.products.map((product) => (
                <li key={product.productId}>
                  Product ID: {product.productId}, Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CartDetails;
