import React from "react";

// This is placeholder
export const AllEquipment: React.FC = () => {
  const equipmentList = [
    { id: 1, name: "Equipment 1", description: "This is equipment 1" },
    { id: 2, name: "Equipment 2", description: "This is equipment 2" },
    { id: 3, name: "Equipment 3", description: "This is equipment 3" },
  ];

  return (
    <div>
      <h1>All Equipment</h1>
      <ul>
        {equipmentList.map((equipment) => (
          <li key={equipment.id}>
            <h3>{equipment.name}</h3>
            <p>{equipment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
