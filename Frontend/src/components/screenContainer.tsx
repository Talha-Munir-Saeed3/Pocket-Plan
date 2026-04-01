import { PropsWithChildren } from "react";
import { View } from "react-native";

import { appStyles } from "../styles/appStyles";

export default function ScreenContainer({ children }: PropsWithChildren) {
  return <View style={appStyles.screen}>{children}</View>;
}
