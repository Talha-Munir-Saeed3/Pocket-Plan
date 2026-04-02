import { SafeAreaView } from "react-native-safe-area-context";

import { appStyles } from "../../styles/appStyles";

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView style={appStyles.screen} edges={["top", "left", "right"]}>
      {children}
    </SafeAreaView>
  );
}

