import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
  
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8db8e2',
    },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>
);