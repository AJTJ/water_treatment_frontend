import { UserRoleEnum } from "common/services/authService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "store/AuthStore";

const AllPlants: React.FC = () => {
  const { user } = useAuthStore();

  let plantsAndRoles = user?.plants_and_roles;
  let isSuperAdmin = user?.global_role === UserRoleEnum.SUPER_ADMIN;

  return (
    <div>
      <h1>All Plants</h1>
      {isSuperAdmin && <Link to={"/plants/create"}>Create New Plant</Link>}
      <ul>
        {plantsAndRoles &&
          plantsAndRoles.map(({ plant, role }) => (
            <li key={plant.id}>
              <h2>{plant.name}</h2>
              <p>Location: {plant.location}</p>
              <p>Your role: {role}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllPlants;
