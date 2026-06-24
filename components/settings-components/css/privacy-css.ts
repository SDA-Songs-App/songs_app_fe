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
    textAlign: "center",
    marginBottom: 10,
    color:isDarkMode?"#000":"#fff"
  },
  date: {
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color:isDarkMode?"#000":"#fff"
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    color:isDarkMode?"#000":"#fff"
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
   })
}
   export default getStyle