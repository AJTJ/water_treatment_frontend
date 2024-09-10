// src/components/EquipmentDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEquipment } from "../hooks/useEquipment";

export const EquipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { equipment, isLoading, isError } = useEquipment(id ?? "");

  if (!id) {
    return <div>Error: No equipment ID provided</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading equipment details.</div>;
  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  return (
    <div>
      <h1>{equipment?.name}</h1>
      <p>{equipment?.description}</p>
      <p>{equipment?.equipment_model_number}</p>
      <p>{equipment?.location}</p>
      <img src={equipment?.image_url ?? ""} alt={equipment?.name} />
      <p>{equipment?.created_at.toString()}</p>
      <p>{equipment?.updated_at.toString()}</p>
    </div>
  );
};
