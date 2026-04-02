import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import InputField from "../../components/common/inputField";
import PrimaryButton from "../../components/common/primaryButton";
import ScreenContainer from "../../components/common/screenContainer";
import { appStyles } from "../../styles/appStyles";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={appStyles.content}>
        <View style={appStyles.authHeader}>
          <Text style={appStyles.authTitle}>Reset Password</Text>
          <Text style={appStyles.authSubtitle}>We will send a reset link to your registered email.</Text>
        </View>

        <View style={appStyles.card}>
          <InputField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <PrimaryButton label="Send Reset Link" onPress={() => router.push("/(auth)/sign-in")} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

