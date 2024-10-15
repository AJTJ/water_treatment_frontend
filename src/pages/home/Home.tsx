import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <p>This is the home page.</p>
      <Link to="/allItems">All Equipment</Link>
      <Link to="/admin">Administrator things</Link>
    </div>
  );
};

export default Home;
