import { createTheme } from "@mui/material/styles";

// Common colors
const colors = {
  primary: { main: "#111111" },
  secondary: { main: "#3f51b5" },
  error: { main: "#f44336" },
  warning: { main: "#ff9800" },
  info: { main: "#2196f3" },
  success: { main: "#4caf50" },
};

// Common typography options
const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

// Create the theme
const theme = createTheme({
  palette: {
    ...colors,
  },
  typography: {
    ...typography,
  },
});

export default theme;
