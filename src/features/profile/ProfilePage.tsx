import { useAuth } from "common/hooks/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Add logic to save the updated profile information
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    // Reset the form or discard changes
    setIsEditMode(false);
  };

  const handleLogout = async () => {
    await logoutUser();

    navigate("/auth");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {isEditMode ? (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
