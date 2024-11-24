import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemPage, ItemsList } from "./features/items";
// import { AuthPage } from "features/auth";
import { Landing } from "features/landing";
import MainLayout from "layouts/MainLayout";
import { ProfilePage } from "features/profile";
import { AuthPage } from "features/auth";
import { Dashboard } from "features/dashboard";
import { AllPlants, CreatePlant, Plant } from "features/plants";
import { NotFound } from "features/notFound";
import { AllQRCodes, QRCode } from "features/qrCodeManagement";
import { ItemRequest, ItemRequests } from "features/itemRequest";

const MyRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="plants">
          <Route index element={<AllPlants />} />
          <Route path="create" element={<CreatePlant />} />
          <Route path="plant/:plant-id">
            <Route index element={<Plant />} />
            <Route path="qr-codes">
              <Route index element={<AllQRCodes />} />
              <Route path=":qr-code-id" element={<QRCode />} />
            </Route>
            <Route path="equipment">
              <Route index element={<ItemsList />} />
              <Route path=":equipment-id" element={<ItemPage />} />
            </Route>
            <Route path="requests">
              <Route index element={<ItemRequests />} />
              <Route path=":request-id" element={<ItemRequest />} />
            </Route>
          </Route>
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
