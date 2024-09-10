import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EquipmentRequestDetails from "../../components/EquipmentRequest";

const EquipmentRequestPage: React.FC = () => {
  return (
    <div>
      <EquipmentRequestDetails />
    </div>
  );
};

export default EquipmentRequestPage;
