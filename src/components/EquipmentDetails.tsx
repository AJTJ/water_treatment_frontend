// src/components/EquipmentDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEquipment } from "../hooks/useEquipment";

export const EquipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { equipment, isLoading, isError } = useEquipment(id ?? "");

  if (!id) {
    return <div>Error: No equipment ID provided</div>; // Handle missing ID
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading equipment details.</div>;

  // TODO: Update equipment details
  return (
    <div>
      <h1>{equipment?.name}</h1>
      <p>{equipment?.description}</p>
    </div>
  );
};
