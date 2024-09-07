// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EquipmentList from "./pages/equipment/index";
import EquipmentDetails from "./pages/equipment/[id]";
import EquipmentRequests from "./pages/equipment/requests/index";
import AdminDashboard from "./pages/admin/index";
import AdminQRCodes from "./pages/admin/qr-codes";
import Login from "./pages/login";
import NotFound from "./pages/404";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Router>
      <Routes>
        {/* Home / Equipment List */}
        <Route path="/" element={<EquipmentList />} />

        {/* Equipment Details (Dynamic Route) */}
        <Route path="/equipment/:id" element={<EquipmentDetails />} />

        {/* Equipment Requests */}
        <Route path="/equipment/requests" element={<EquipmentRequests />} />

        {/* Admin Section */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/qr-codes" element={<AdminQRCodes />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;

// import React from "react";

// function call(word: string) {
//   console.log("hello " + word);
// }

// function App() {
//   return (
//     <div className="App">
//       <div>memes</div>
//       <button onClick={() => call("world")}>call</button>
//     </div>
//   );
// }

// export default App;
