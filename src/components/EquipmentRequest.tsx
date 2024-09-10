import React from "react";
import { useEquipmentRequestByID } from "../hooks/useEquipmentRequest";
import { useParams } from "react-router-dom";

const EquipmentRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { equipmentRequest, isLoading, isError } = useEquipmentRequestByID(
    id ?? ""
  );

  if (!id) {
    return <div>Error: No equipment request ID provided</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading equipment request details.</div>;
  if (!equipmentRequest) {
    return <div>Equipment request not found</div>;
  }

  return (
    <div>
      <h2>Equipment Request</h2>
      <p>ID: {equipmentRequest.id}</p>
      <p>Description: {equipmentRequest.description}</p>
      <p>Employee Name: {equipmentRequest.employee_name}</p>
      <p>Image URL: {equipmentRequest.image_url}</p>
      <p>Equipment ID: {equipmentRequest.equipment_id}</p>
      <p>Status: {equipmentRequest.status}</p>
      <p>Created At: {equipmentRequest.created_at}</p>
      <p>Updated At: {equipmentRequest.updated_at}</p>
    </div>
  );
};

export default EquipmentRequestDetails;
