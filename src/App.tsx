// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AllEquipment } from "./pages/equipment";
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
        <Route path="/" element={<AllEquipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />
        <Route path="/equipment/requests" element={<EquipmentRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/qr-codes" element={<AdminQRCodes />} />
        <Route path="/login" element={<Login />} />
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
