import { Text } from "react-native";

import ScreenContainer from "../components/screenContainer";
import { appStyles } from "../styles/appStyles";

export default function SignInScreen() {
  return (
    <ScreenContainer>
      <Text style={appStyles.title}>Sign In</Text>
    </ScreenContainer>
  );
}
