import { GestureHandlerRootView } from "react-native-gesture-handler";
import LandingPage from "./landingPage";
export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Navbar /> */}
      <LandingPage />
    </GestureHandlerRootView>
  );
}
