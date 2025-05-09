import React from "react";
import ThemeProvider from "../ThemeProvier";

import MainApp from "../(tabs)/MainApp";
export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
