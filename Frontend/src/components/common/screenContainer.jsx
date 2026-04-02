import { SafeAreaView } from "react-native-safe-area-context";

import { appStyles } from "../../styles/appStyles";

export default function ScreenContainer({ children, style, edges = ["top", "left", "right"] }) {
  return (
    <SafeAreaView style={[appStyles.screen, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

