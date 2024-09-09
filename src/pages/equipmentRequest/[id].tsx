import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EquipmentRequestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      {/* Render the equipment request details */}
      <h1>Equipment Request {id}</h1>
      {/* Add your JSX code here */}
    </div>
  );
};

export default EquipmentRequestPage;
