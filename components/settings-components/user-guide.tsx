import {View, Text, StyleSheet} from "react-native"
import {useLanguage} from '../languageContext/language-context'
const UserGuide = () =>{
    const lang = useLanguage()
    return (
    <View style={styles.container}>
      <Text>User Guide Goes Here -- {lang.language}</Text>
    </View>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  }
})
export default UserGuide