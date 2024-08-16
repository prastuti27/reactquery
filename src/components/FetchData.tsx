import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CartDetails from "./CartDetails";
import PostCartForm from "./PostCartForm";
import { useState } from "react";

const fetchCart = async () => {
  const response = await axios.get("https://fakestoreapi.com/carts/7");
  return response.data;
};

const FetchData = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div>
      <CartDetails
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <button onClick={handleEditClick}>Edit</button>
      <PostCartForm initialCartData={data} editMode={editMode} />
    </div>
  );
};

export default FetchData;
