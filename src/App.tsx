// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemPage, ItemsList } from "./pages/items";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path="/" element={<ItemsList />} />
        <Route path="/item/:id" element={<ItemPage />} />
        {/* <Route path="/item/requests" element={<ItemRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/qr-codes" element={<AdminQRCodes />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
