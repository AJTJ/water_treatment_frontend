import { AuthForm } from "features/auth/AuthForm";
import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Streamline</h1>
      <AuthForm redirect="/dashboard" />
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Landing;
