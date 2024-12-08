import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "store/AuthStore";

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const plants = user?.plants_and_roles?.map((plant) => plant.plant);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>

      {plants && (
        <div>
          <h2>Your plants:</h2>
          <ul>
            {plants.map((plant) => (
              <Link to={`/plants/${plant.id}`} key={plant.id}>
                {plant.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
      <Link to="/plants">All Plants</Link>
      <Link to="/auth">Auth</Link>
    </div>
  );
};

export default Dashboard;
