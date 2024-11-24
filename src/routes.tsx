import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemPage, ItemsList } from "./features/items";
// import { AuthPage } from "features/auth";
import Dashboard from "features/dashboard/dashboard";
import { Landing } from "features/landing";
import MainLayout from "layouts/MainLayout";

const MyRoutes: React.FC = () => (
  <Router>
    <Routes></Routes>
    <Routes>
      <MainLayout>
        <Route path="/" element={<Landing />} />
      </MainLayout>
      {/* <Route path="/" element={<AuthPage />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/allItems" element={<ItemsList />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  </Router>
);

export default MyRoutes;

export {};
