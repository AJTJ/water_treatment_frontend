import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemPage, ItemsList } from "./pages/items";
import { AuthPage } from "./pages/auth";
import { AdminDashboard } from "./pages/admin";
import { PlantLanding } from "./pages/plant";

const MyRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/allItems" element={<ItemsList />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/plant/:id" element={<PlantLanding />} />
      {/* <Route path="/admin/qr-codes" element={<AdminQRCodes />} /> */}
      {/* <Route path="/item/requests" element={<ItemRequests />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
);

export default MyRoutes;

export {};
