import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Cart, PostCartFormProps} from "../types";

const upsertCart = async (cart: Cart, id?: number): Promise<void> => {
  const url = id ? `https://fakestoreapi.com/carts/${id}` : "https://fakestoreapi.com/carts";
  await axios({ method: id ? "put" : "post", url, data: cart });
};


const PostCartForm = ({ initialCartData, editMode = false }: PostCartFormProps) => {
  const [cartData, setCartData] = useState<Cart>(
    initialCartData || { id: 0, userId: 0, date: "", products: [{ productId: "", quantity: 1 }] }
  );

  const mutation = useMutation({
    mutationFn: (cart: Cart) => upsertCart(cart, editMode ? cart.id : undefined),
    onError: (error) => console.error("Error submitting cart:", error),
    onSuccess: () => console.log("Cart submitted successfully!", cartData),
  });

  useEffect(() => {
    if (editMode && initialCartData) setCartData(initialCartData);
  }, [initialCartData, editMode]);

  const handleInputChange = (name: string, value: string | number, index?: number) => {
    if (index !== undefined) {
      setCartData((prev) => ({
        ...prev,
        products: prev.products.map((prod, i) =>
          i === index ? { ...prod, [name]: value } : prod
        ),
      }));
    } else {
      setCartData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(cartData);
  };

  return (
    <div>
      <h1>{editMode ? "Edit Cart" : "Post Cart Form"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="userId"
            value={cartData.userId}
            onChange={(e) => handleInputChange("userId", parseInt(e.target.value))}
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={cartData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </label>
        {cartData.products.map((product, index) => (
          <div key={index}>
            <label>
              Product ID:
              <input
                type="text"
                name="productId"
                value={product.productId}
                onChange={(e) => handleInputChange("productId", e.target.value, index)}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleInputChange("quantity", parseInt(e.target.value), index)}
              />
            </label>
          </div>
        ))}
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {mutation.isError && <div>Error: {mutation.error?.message}</div>}
      {mutation.isSuccess && <div>Cart submitted successfully!</div>}
    </div>
  );
};

export default PostCartForm;
