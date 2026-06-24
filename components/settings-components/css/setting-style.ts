import { StyleSheet } from "react-native";
const getStyle = (isDarkMode:boolean) =>{
   return StyleSheet.create({
  container: { flex: 1, backgroundColor: isDarkMode?"#f2f2f2":"#302828" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: isDarkMode?"#fff":'#363131',
    paddingLeft:50
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color:isDarkMode?'#000':'#fff' },
  card: {
    backgroundColor: isDarkMode?"#fff":'#363131',
    borderRadius: 12,
    margin: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    color:'green'
  },
  rowText: { marginLeft: 12, fontSize: 16, color: isDarkMode?"#000":'#fff' },
  premiumCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  referCard: {
    backgroundColor: "#3899ab",
    marginHorizontal: 16,
    borderRadius: 12,
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  referText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  referSubText: { color: "#fff", marginTop: 4 },
});
}
export default getStyle