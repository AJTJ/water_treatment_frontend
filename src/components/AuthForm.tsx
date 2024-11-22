import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthForm = () => {
  const {
    loginUser,
    isLoading,
    isError,
    challengeResponse,
    completeNewPasswordChallenge,
  } = useAuth();
  const [email, setEmail] = useState<string>("janke.aaron@gmail.com");
  // const [password, setPassword] = useState<string>("uU@2OElW");
  const [password, setPassword] = useState<string>("Dankmemes1!");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleLogin = async () => {
    await loginUser(email, password);
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordsMatch(value === confirmNewPassword);
  };

  const handleConfirmNewPasswordChange = (value: string) => {
    setConfirmNewPassword(value);
    setPasswordsMatch(value === newPassword);
  };

  const handleNewPasswordSubmit = async () => {
    if (passwordsMatch) {
      await completeNewPasswordChallenge(email, newPassword);
    }
  };
  return (
    <div>
      <h3>Login</h3>
      {!challengeResponse ? (
        <>
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
        </>
      ) : (
        <>
          <p>{challengeResponse.message}</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required={true}
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => handleNewPasswordChange(e.target.value)}
            placeholder="New Password"
            required={true}
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
            placeholder="Confirm Password"
            required={true}
          />
          {!passwordsMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <button
            onClick={handleNewPasswordSubmit}
            disabled={
              isLoading ||
              !passwordsMatch ||
              newPassword === "" ||
              confirmNewPassword === ""
            }
          >
            {isLoading ? "Submitting..." : "Submit New Password"}
          </button>
        </>
      )}

      {isError && <p>Error: {isError.message}</p>}
    </div>
  );
};

export default AuthForm;
