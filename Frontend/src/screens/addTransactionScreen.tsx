import { Text } from "react-native";

import ScreenContainer from "../components/screenContainer";
import { appStyles } from "../styles/appStyles";

export default function AddTransactionScreen() {
  return (
    <ScreenContainer>
      <Text style={appStyles.title}>Add Transaction</Text>
    </ScreenContainer>
  );
}
