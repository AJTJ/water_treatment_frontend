import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthForm = () => {
  const { loginUser, isLoading, isError, loginResponse } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    loginUser(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required={true}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required={true}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {isError && <p>Error: {isError.message}</p>}
      {loginResponse && <p>Welcome! You are logged in.</p>}
    </div>
  );
};

export default AuthForm;
