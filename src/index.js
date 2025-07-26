import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8db8e2",
      light: "#aed0ed",
      dark: "#6a8fb0",
    },
    background: {
      default: "#EEEEEE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#888888",
    },
  },

  typography: {
    fontFamily: "Monserrat",
    h1: {
      fontSize: "3.5 rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:900px)": {
        fontSize: "3 rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.5 rem",
      },
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
