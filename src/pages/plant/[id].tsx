import React from "react";
import { useParams } from "react-router-dom";

const PlantLanding: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div>Plant name</div>
      <div>Plant location info</div>
      <button>External link to equipment requests</button>
      <button>Link to QRCode Management</button>
      <button>Edit plant information</button>
    </div>
  );
};

export default PlantLanding;
