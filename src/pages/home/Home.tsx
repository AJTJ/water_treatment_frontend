import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../../components";
import {
  CreateUserRequest,
  GetUserRequest,
  UserRoleEnum,
} from "../../services/authService";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useGetUser } from "../../hooks/useGetUser";

let myRequest: CreateUserRequest = {
  user_name: "Aaron Janke",
  email: "janke.aaron@gmail.com",
  roles: [UserRoleEnum.SUPER_ADMIN],
};

let userRequest: GetUserRequest = {
  email: "janke.aaron@gmail.com",
};

const Home: React.FC = () => {
  const {
    user: createdUser,
    error: createError,
    loading: createLoading,
    createUser,
  } = useCreateUser();

  const { user, error, loading, getUser } = useGetUser();

  console.log({ user, error, loading });

  return (
    <div>
      <p>This is the home page.</p>
      <Link to="/allItems">All Equipment</Link>
      <Link to="/admin">Administrator things</Link>

      <div>Created User: {createdUser && JSON.stringify(createdUser)}</div>
      <div>CreateError: {JSON.stringify(createError)}</div>
      <div>CreateLoading: {JSON.stringify(createLoading)}</div>
      <div>Got User: {user && JSON.stringify(user)}</div>
      <div>GetError: {JSON.stringify(error)}</div>
      <div>GetLoading: {JSON.stringify(loading)}</div>

      <button onClick={() => createUser(myRequest)}>Create Super User</button>
      <button onClick={() => getUser(userRequest)}>Get Super User</button>
      <AuthForm />
    </div>
  );
};

export default Home;
