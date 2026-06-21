import { Linking, Alert, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ShareToTelegram = () => {
  const handlePress = async () => {
    const url = "https://t.me/SDAStagingApp"; // replace with your group/channel link

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open Telegram.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name="paper-plane" size={24} color="#229ED9" />
    </TouchableOpacity>
  );
};

export default ShareToTelegram;