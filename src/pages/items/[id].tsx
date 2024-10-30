import React from "react";
import { useParams } from "react-router-dom";
import { ItemDetails } from "../../components";

export const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: Get Item details by ID

  return (
    <div>
      <ItemDetails />
    </div>
  );
};

export default ItemPage;
