import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import MyRoutes from "./routes";
import { validateSession } from "./services/authService";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeSession() {
      try {
        await validateSession();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    initializeSession();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isLoading ? <div>Loading...</div> : <MyRoutes />}
    </ThemeProvider>
  );
};

export default App;
