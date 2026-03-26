import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "አማርኛ",
  setLanguage: () => {},
});
export const useLanguage = () =>useContext(LanguageContext);
type Props = {children:ReactNode}

 const LanguageProvider:React.FC<Props> = ({ children}) => {
  const [language, setSelectedLanguage] = useState("አማርኛ");

  // Load saved language from AsyncStorage
  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem("selectedLanguage");
      if (lang) setSelectedLanguage(lang);
    };
    loadLanguage();
  }, []);
  const setLanguage = async(lang:string) =>{
    setSelectedLanguage(lang);
    await AsyncStorage.setItem("selectedLanguage", lang)
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageProvider;

// Hook to use context