import { UserRoleEnum } from "common/services/authService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "store/AuthStore";

interface Plant {
  id: number;
  name: string;
  location: string;
}

const AllPlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const { user } = useAuthStore();

  let isSuperAdmin = user?.global_role === UserRoleEnum.SUPER_ADMIN;

  return (
    <div>
      <h1>All Plants</h1>
      <Link to={"/plants/create"}>Create New Plant</Link>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <h2>{plant.name}</h2>
            <p>Location: {plant.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlants;
