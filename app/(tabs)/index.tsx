import React from "react";
import ThemeProvider from "../ThemeProvider";
import MainApp from "../(tabs)/MainApp";
import LanguageProvider from "@/components/languageContext/language-context";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider><MainApp /></LanguageProvider>      
    </ThemeProvider>
  );
}
