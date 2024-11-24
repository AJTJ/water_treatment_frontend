import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/AuthStore";
import styled from "styled-components";

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ProfileButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/");
  };

  const { user } = useAuthStore();
  return (
    <NavBarContainer onClick={handleTitleClick}>
      <Logo>Streamline</Logo>
      <ProfileButton to={user ? "/profile" : "/auth"}>Profile</ProfileButton>
    </NavBarContainer>
  );
};

export default NavBar;
