import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemPage, ItemsList } from "./features/items";
// import { AuthPage } from "features/auth";
import { Landing } from "features/landing";
import MainLayout from "layouts/MainLayout";
import { ProfilePage } from "features/profile";
import { AuthPage } from "features/auth";
import { Dashboard } from "features/dashboard";
import { AllPlants, CreateAndEditPlant, Plant } from "features/plants";
import { NotFound } from "features/notFound";
import { AllQRCodes, QRCode } from "features/qrCodeManagement";
import UsersList from "features/users/UsersList";
import { User } from "features/users";

const MyRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/plants">
          <Route index element={<AllPlants />} />
          <Route path="editPlant/:plantId" element={<CreateAndEditPlant />} />
          <Route path="create" element={<CreateAndEditPlant />} />
          <Route path=":plantId">
            <Route index element={<Plant />} />
            <Route path="qr-codes">
              <Route index element={<AllQRCodes />} />
              <Route path=":qrCodeId" element={<QRCode />} />
            </Route>
            <Route path="equipment">
              <Route index element={<ItemsList />} />
              <Route path=":equipmentId" element={<ItemPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<User />} />
          <Route path=":userId/edit" element={<User />} />
          <Route path="create" element={<User />} />
        </Route>

        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default MyRoutes;

//<Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const RequireAuth = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
// };

// export default RequireAuth;

// <Route path="requests">
// <Route index element={<ItemRequests />} />
// <Route path=":requestId" element={<ItemRequest />} />
// </Route>
