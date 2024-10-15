// src/App.tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import MyRoutes from "./routes";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <MyRoutes />
  </ThemeProvider>
);

export default App;
