import { Text } from "react-native";

import ScreenContainer from "../components/screenContainer";
import { appStyles } from "../styles/appStyles";

export default function DashboardScreen() {
  return (
    <ScreenContainer>
      <Text style={appStyles.title}>Dashboard</Text>
    </ScreenContainer>
  );
}
