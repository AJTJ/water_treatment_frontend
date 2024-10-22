// src/components/ItemDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../hooks/useItem";

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { item, isLoading, isError } = useItem(id ?? "");

  if (!id) {
    return <div>Error: No item ID provided</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading item details.</div>;
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h1>{item?.name}</h1>
      <p>{item?.description}</p>
      <p>{item?.item_model_number}</p>
      <p>{item?.location}</p>
      <img src={item?.image_url ?? ""} alt={item?.name} />
      <p>{item?.created_at.toString()}</p>
      <p>{item?.updated_at.toString()}</p>
    </div>
  );
};

export default ItemDetails;
