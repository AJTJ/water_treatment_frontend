import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../../components";
import { CreateUserRequest, UserRoleEnum } from "../../services/authService";
import { useCreateUser } from "../../hooks/useCreateUser";

let myRequest: CreateUserRequest = {
  user_name: "Aaron Janke",
  email: "janke.aaron@gmail.com",
  roles: [UserRoleEnum.SUPER_ADMIN],
};

const Home: React.FC = () => {
  const { user, error, loading, createUser } = useCreateUser();

  console.log(user, error, loading);

  return (
    <div>
      <p>This is the home page.</p>
      <Link to="/allItems">All Equipment</Link>
      <Link to="/admin">Administrator things</Link>

      <button onClick={() => createUser(myRequest)}>Create Super User</button>
      {/* <button onClick={() => getUser(myRequest)}>Create Super User</button> */}
      <AuthForm />
    </div>
  );
};

export default Home;
