import { View } from "react-native";

import { appStyles } from "../../styles/appStyles";

export default function ScreenContainer({ children }) {
  return <View style={appStyles.screen}>{children}</View>;
}

