import React from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../../components";
import {
  CreateUserRequest,
  GetUserRequest,
  UserRoleEnum,
} from "../../services/authService";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useGetUser } from "../../hooks/useGetUser";
import { useAuthStore } from "../../store/AuthStore";
import { useArchiveUser } from "../../hooks/useArchiveUser";
import { useReactivateUser } from "../../hooks/useReactivateUser";

let myRequest: CreateUserRequest = {
  user_name: "Aaron Janke",
  email: "janke.aaron@gmail.com",
  global_role: UserRoleEnum.SUPER_ADMIN,
  plants_and_roles: [],
};

let userRequest: GetUserRequest = {
  email: "janke.aaron@gmail.com",
};

const AuthPage: React.FC = () => {
  const {
    user: createdUser,
    error: createError,
    loading: createLoading,
    createUser,
  } = useCreateUser();

  const { archiveUser } = useArchiveUser();
  const { error: reactivateError, reactivateUser } = useReactivateUser();

  const { user, error, loading, getUser } = useGetUser();
  const { user: authUser } = useAuthStore();

  console.log({ user, error, loading });

  return (
    <div>
      <div>Logged in?: {authUser ? "Yes" : "No"}</div>
      <Link to="/allItems">All Equipment</Link>
      <Link to="/admin">Administrator things</Link>
      <div>Created User: {JSON.stringify(createdUser)}</div>
      {createError && <div>Error: {createError.message}</div>}
      {createLoading && <div>Creating User...</div>}
      <div>Authed User: {JSON.stringify(authUser)}</div>

      <button onClick={() => archiveUser("janke.aaron@gmail.com")}>
        Archive User
      </button>
      <button onClick={() => reactivateUser("janke.aaron@gmail.com")}>
        Reactivate User
      </button>
      {reactivateError && <div>ReactivateError: {reactivateError.message}</div>}
      <button onClick={() => createUser(myRequest)}>Create Super User</button>
      <button onClick={() => getUser(userRequest)}>Get Super User</button>
      <AuthForm />
    </div>
  );
};

export default AuthPage;
