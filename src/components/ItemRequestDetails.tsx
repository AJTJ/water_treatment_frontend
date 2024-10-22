import React from "react";
import { useItemRequestByID } from "../hooks/useItemRequest";
import { useParams } from "react-router-dom";

const ItemRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { itemRequest, isLoading, isError } = useItemRequestByID(id ?? "");

  if (!id) {
    return <div>Error: No item request ID provided</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading item request details.</div>;
  if (!itemRequest) {
    return <div>Item request not found</div>;
  }

  return (
    <div>
      <h2>Item Request</h2>
      <p>ID: {itemRequest.id}</p>
      <p>Description: {itemRequest.description}</p>
      <p>Employee Name: {itemRequest.employee_name}</p>
      <p>Image URL: {itemRequest.image_url}</p>
      <p>Item ID: {itemRequest.item_id}</p>
      <p>Status: {itemRequest.status}</p>
      <p>Created At: {itemRequest.created_at}</p>
      <p>Updated At: {itemRequest.updated_at}</p>
    </div>
  );
};

export default ItemRequestDetails;
