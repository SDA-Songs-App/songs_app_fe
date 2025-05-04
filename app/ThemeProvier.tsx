import { Appearance } from "react-native";
import { DarkTheme, DefaultTheme} from "@react-navigation/native";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isDarkMode : boolean
    toggleTheme : () =>void
    theme :typeof DarkTheme | typeof DefaultTheme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
interface ThemeProviderProps {
    children : ReactNode
}
 const ThemeProvider:React.FC<ThemeProviderProps> = ({children}) =>{
    const colorScheme = Appearance.getColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(colorScheme !="dark")
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({colorScheme}) =>{
            setIsDarkMode(colorScheme != 'dark')
        })
        return () =>subscription.remove()
    }, [])

    const toggleTheme = () =>{
        setIsDarkMode((prev) =>!prev)
    }

    return (
        <ThemeContext.Provider
        value={{
            isDarkMode, 
            toggleTheme,
            theme : isDarkMode ? DarkTheme:DefaultTheme
        }}
        >
        {children}
        </ThemeContext.Provider>
    );
}
 export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context){
        console.warn("useTheme called outside ThemeProvider");
        throw new Error ("useTheme must be used within a ThemeProvider")
    }
    return context
}
export default ThemeProvider;

