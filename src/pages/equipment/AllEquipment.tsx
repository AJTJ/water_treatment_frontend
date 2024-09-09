import React from "react";
import { useManyEquipment } from "../../hooks/useEquipment";

const AllEquipment: React.FC = () => {
  const { equipmentList, isLoading, isError } = useManyEquipment();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <div>
      <h1>All Equipment</h1>
      <ul>
        {equipmentList?.map((equipment) => (
          <a href={`/equipment/${equipment.id}`}>{equipment.name}</a>
        ))}
      </ul>
    </div>
  );
};

export default AllEquipment;
