import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./common/styles/theme";
import { GlobalStyles } from "./common/styles/GlobalStyles";
import MyRoutes from "./routes";
import { validateSession } from "./common/services/authService";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isLoading ? <div>Loading...</div> : <MyRoutes />}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
