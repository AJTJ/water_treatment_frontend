import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EquipmentDetails } from "../../components/EquipmentDetails";

export const Equipment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <EquipmentDetails />
    </div>
  );
};

export default EquipmentDetails;
