import { StyleSheet } from "react-native";
const getStyle = (isDarkMode:boolean) =>{
   return StyleSheet.create({
      container: {
    flex: 1,
    padding: 16,
    backgroundColor:isDarkMode? "#fff" :'#302828',
    
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color:isDarkMode?"#000":"#fff"

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color:isDarkMode?"#000":"#fff"

  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color:isDarkMode?"#000":"#fff"
    
  },
  list: {
    marginLeft: 10,
    marginBottom: 10,
    color:isDarkMode?"#000":"#fff"

  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
    color:isDarkMode?"#000":"#fff"

  },
   })}
   export default getStyle