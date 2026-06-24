import { StyleSheet } from "react-native";
const getStyle = (isDarkMode:boolean) =>{
   return StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor:isDarkMode? "#fff" :'#302828',
  },
  header:{
      fontSize:26,
       color:isDarkMode?"#000":"#fff"
  },
  stepsTitle:{
       color:isDarkMode?"#000":"#fff"

  },
  content: {
    padding: 16,
    paddingBottom: 30,
     color:isDarkMode?"#000":"#fff"
  },
  bgImage: {
    width: "100%",
    height: 500, // adjust as needed
    marginVertical: 16,
  },
  tableTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
   color:isDarkMode?"#000":"#fff"
},

table: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  overflow: "hidden",
   color:isDarkMode?"#000":"#fff"
},

row: {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
  // color:isDarkMode?"#000":"#fff"
},

headerRow: {
  backgroundColor: "#564545",
},

cell: {
  flex: 1,
  marginLeft: 12,
   color:isDarkMode?"#000":"#fff"
  
},
SongNum:{
flex: 1,
  marginLeft: 0,
   color:isDarkMode?"#000":"#fff"

},
headerText: {
  fontWeight: "bold",
},
})
}
   export default getStyle